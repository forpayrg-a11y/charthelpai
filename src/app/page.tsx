"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  History,
  Settings,
  Search,
  Bell,
  User,
  TrendingUp,
  LineChart,
  BrainCircuit,
  Sparkles
} from "lucide-react";
import { ChartUpload } from "@/components/chart-upload";
import { AnalysisCard } from "@/components/analysis-card";
import { TradePlan } from "@/components/trade-plan";
import { AnalysisChart } from "@/components/analysis-chart";
import { cn } from "@/lib/utils";
import { AnalysisResult } from "@/lib/gemini";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton
} from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { MarketTicker } from "@/components/market-ticker";
import { ProGate } from "@/components/pro-gate";

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isPro, setIsPro] = useState(false); // Mock PRO state for demonstration

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysis(result);
  };

  // Mock data for Recharts, in real app this could be derived from analysis
  const mockChartData = Array.from({ length: 20 }, (_, i) => ({
    time: `${i}:00`,
    price: 50000 + Math.random() * 5000
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 glass-morphism m-4 border-none hidden md:flex flex-col relative z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-black text-xl tracking-tight hidden lg:block"
          >
            Charthelp <span className="text-brand-primary">AI</span>
          </motion.span>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active />
          <NavItem icon={<History />} label="Analysis History" />
          <NavItem icon={<LineChart />} label="Market Overview" />
          <NavItem icon={<Settings />} label="Settings" />
        </nav>

        <div className="p-4 mt-auto">
          <div className="glass p-5 rounded-2xl hidden lg:block border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-brand-secondary" />
              <p className="text-[10px] font-black text-brand-secondary tracking-widest uppercase">PRO PLAN</p>
            </div>
            <p className="text-[10px] text-foreground/50 leading-tight font-medium">Unlock harmonic patterns & whale alerts.</p>
            <button
              onClick={() => setIsPro(!isPro)}
              className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold py-3 rounded-xl transition-all border border-white/5"
            >
              {isPro ? "Current: PRO" : "Upgrade Now"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <MarketTicker />

        {/* Topbar */}
        <header className="h-20 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl w-96 focus-within:border-brand-primary/50 transition-colors">
            <Search className="w-4 h-4 text-foreground/30" />
            <input
              type="text"
              placeholder="Search assets or analysis..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-foreground/20 font-medium"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-3 glass rounded-xl relative hover:bg-white/10 transition-colors border border-white/5">
              <Bell className="w-5 h-5 text-foreground/70" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505]" />
            </button>
            <div className="flex items-center gap-3 p-1 pr-1 glass rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
              <SignedIn>
                <div className="flex items-center gap-3 pl-4 pr-1">
                  <div className="hidden lg:block text-right">
                    <p className="text-[10px] font-bold text-foreground/30 leading-none mb-1">TRADING AS</p>
                    <p className="text-xs font-black tracking-tight">Tom @ Gorvu</p>
                  </div>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 rounded-lg shadow-lg"
                      }
                    }}
                  />
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-6 py-2.5 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-brand-primary/20">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-2">
                      Scanner <span className="text-brand-primary">01</span>
                    </h2>
                    <p className="text-sm text-foreground/40 font-medium">Upload a chart screenshot for neural network verification.</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">AI Engine Online</span>
                  </div>
                </div>
                <ChartUpload onAnalysisComplete={handleAnalysisComplete} />
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
                    <ProGate isPro={isPro} featureName="Harmonic Visualizations">
                      <AnalysisChart
                        data={mockChartData}
                        sentiment={analysis.sentiment}
                      />
                    </ProGate>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
                    <div className="glass-morphism p-12 flex flex-col items-center justify-center text-center gap-4 border-dashed border-2">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <LineChart className="text-foreground/20" />
                      </div>
                      <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Awaiting Scanner Input</p>
                    </div>
                    <div className="glass-morphism p-12 flex flex-col items-center justify-center text-center gap-4 border-dashed border-2">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <BrainCircuit className="text-foreground/20" />
                      </div>
                      <p className="text-xs font-bold text-foreground/30 uppercase tracking-widest">Neural Analysis Pending</p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <aside className="space-y-6">
              {analysis ? (
                <TradePlan
                  levels={[
                    { label: "Optimal Entry", price: analysis.levels.entry, type: "entry" },
                    { label: "Stop Loss", price: analysis.levels.sl, type: "sl" },
                    ...analysis.levels.tp.map((price, i) => ({ label: `Take Profit ${i + 1}`, price, type: "tp" as const }))
                  ]}
                />
              ) : (
                <div className="glass-morphism p-8 flex flex-col items-center justify-center text-center gap-4 opacity-50 grayscale">
                  <Sparkles className="w-12 h-12 text-brand-primary" />
                  <p className="text-sm font-bold uppercase tracking-widest">Execute AI Scan <br /> to see Plan</p>
                </div>
              )}

              <div className="glass-morphism p-6 space-y-4">
                <h4 className="font-bold text-sm tracking-widest uppercase text-foreground/40">Quick Insights</h4>
                <div className="space-y-3">
                  <InsightItem label="Market Volatility" value={analysis ? "High" : "---"} />
                  <InsightItem label="Trend Alignment" value={analysis?.sentiment === "bullish" ? "Strong" : "Weak"} />
                  <InsightItem label="Risk Score" value={analysis ? "B+" : "---"} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactElement, label: string, active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer group",
      active
        ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
        : "text-foreground/40 hover:bg-white/5 hover:text-foreground/70"
    )}>
      {React.cloneElement(icon, { className: "w-5 h-5" } as React.HTMLAttributes<SVGElement>)}
      <span className="font-bold text-sm hidden lg:block">{label}</span>
    </div>
  );
}

function InsightItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-foreground/50 font-medium">{label}</span>
      <span className="text-xs font-bold px-2 py-0.5 bg-white/5 rounded-md">{value}</span>
    </div>
  );
}
