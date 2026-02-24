"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  History,
  FileImage,
  Sparkles,
  BrainCircuit,
  LineChart
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { ChartUpload } from "@/components/chart-upload";
import { Topbar } from "@/components/topbar";
import { AnalysisCard } from "@/components/analysis-card";
import { TradePlan } from "@/components/trade-plan";
import { LineChartAI } from "@/components/charts/LineChartAI";
import { QuickInsights } from "@/components/quick-insights";
import { WhaleAlerts } from "@/components/whale-alerts";
import { cn } from "@/lib/utils";
import { AnalysisResult } from "@/lib/gemini";
import { motion, AnimatePresence } from "framer-motion";
import { MarketTicker } from "@/components/market-ticker";
import { ProGate } from "@/components/pro-gate";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/store";
import { useSyncUser } from "@/hooks/use-user-sync";

export default function Home() {
  useSyncUser();
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { isPro, setUser, setLoading: setStoreLoading } = useUserStore();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Check for Stripe redirect status
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Subscription successful!");
      // Success logic if needed, but useSyncUser handles updates
    }
    if (query.get("canceled")) {
      console.log("Subscription canceled.");
    }
  }, []);

  const handleUpgrade = async () => {
    if (isPro) return; // Already Pro

    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      if (response.ok) {
        const { url } = await response.json();
        if (url) {
          window.location.href = url;
        }
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
    }
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysis(result);
  };

  // Mock data for Recharts, in real app this could be derived from analysis
  const mockChartData = Array.from({ length: 20 }, (_, i) => ({
    time: `${i}:00`,
    price: 50000 + Math.random() * 5000
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar onUpgrade={handleUpgrade} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <MarketTicker />

        <Topbar />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                  <div>
                    <h2 className="text-2xl lg:text-4xl font-black italic tracking-tighter uppercase leading-none mb-2">
                      ChartHelp <span className="text-brand-primary"></span>
                    </h2>
                    <p className="text-xs lg:text-sm text-foreground/40 font-medium">Upload a chart screenshot for neural network verification.</p>
                  </div>
                  <div className="flex items-center self-start sm:self-auto gap-2 px-4 py-2 bg-muted rounded-2xl border border-border">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">AI Engine Online</span>
                  </div>
                </div>
                <ChartUpload onAnalysisComplete={handleAnalysisComplete} />
                {analysis && (
                  <QuickInsights
                    volatility={analysis.volatility || "---"}
                    trendAlignment={analysis.trendAlignment || "---"}
                    riskScore={analysis.riskScore || "---"}
                    className="mt-8"
                  />
                )}
              </section>

              <AnimatePresence mode="wait">
                {analysis ? (
                  <motion.div
                    key="analysis-results"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <AnalysisCard
                      title={analysis.asset || "Market Analysis"}
                      sentiment={analysis.sentiment}
                      confidence={analysis.confidence}
                      description={analysis.description}
                      patterns={analysis.patterns}
                    />
                    <ProGate isPro={isPro} featureName="Harmonic Visualizations" onUpgrade={handleUpgrade}>
                      <LineChartAI
                        data={mockChartData}
                        sentiment={analysis.sentiment}
                      />
                    </ProGate>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 dark:opacity-40">
                    <div className="glass-morphism p-12 flex flex-col items-center justify-center text-center gap-4 border-dashed border-2 border-border/50">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border/50">
                        <LineChart className="text-foreground/20" />
                      </div>
                      <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Awaiting Scanner Input</p>
                    </div>
                    <div className="glass-morphism p-12 flex flex-col items-center justify-center text-center gap-4 border-dashed border-2 border-border/50">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border/50">
                        <BrainCircuit className="text-foreground/20" />
                      </div>
                      <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Neural Analysis Pending</p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <aside className="space-y-6">
              {analysis?.levels ? (
                <TradePlan
                  levels={[
                    { label: "Optimal Entry", price: analysis.levels.entry, type: "entry" },
                    { label: "Stop Loss", price: analysis.levels.sl, type: "sl" },
                    ...(analysis.levels.tp || []).map((price, i) => ({ label: `Take Profit ${i + 1}`, price, type: "tp" as const }))
                  ]}
                />
              ) : (
                <div className="glass-morphism p-8 flex flex-col items-center justify-center text-center gap-4 opacity-50 grayscale">
                  <Sparkles className="w-12 h-12 text-brand-primary" />
                  <p className="text-sm font-bold uppercase tracking-widest">Execute AI Scan <br /> to see Plan</p>
                </div>
              )}

              <ProGate isPro={isPro} featureName="Whale Alerts" onUpgrade={handleUpgrade}>
                <WhaleAlerts />
              </ProGate>

            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

