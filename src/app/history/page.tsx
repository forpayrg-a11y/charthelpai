"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { MarketTicker } from "@/components/market-ticker";
import { Topbar } from "@/components/topbar";
import {
    History as HistoryIcon,
    Calendar,
    Clock,
    TrendingUp,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSyncUser } from "@/hooks/use-user-sync";

interface AnalysisItem {
    _id: string;
    asset: string;
    timeframe: string;
    sentiment: "bullish" | "bearish" | "neutral";
    confidence: number;
    description: string;
    volatility?: string;
    trendAlignment?: string;
    riskScore?: string;
    createdAt: string;
}

export default function HistoryPage() {
    useSyncUser();
    const [history, setHistory] = useState<AnalysisItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch("/api/history");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setHistory(data);
                }
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
            <Sidebar onUpgrade={() => { }} />

            <main className="flex-1 flex flex-col overflow-hidden relative">
                <MarketTicker />

                <Topbar />

                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <h2 className="text-2xl lg:text-4xl font-black italic tracking-tighter uppercase leading-none mb-2">
                                    Analysis <span className="text-brand-primary">History</span>
                                </h2>
                                <p className="text-[10px] lg:text-sm text-foreground/40 font-medium uppercase tracking-widest leading-relaxed">Review your previous AI-powered chart discoveries.</p>
                            </div>
                            <div className="flex items-center self-start sm:self-auto gap-2 px-4 py-2 bg-muted/50 border border-border rounded-xl text-[10px] font-black uppercase tracking-widest text-foreground/40">
                                <HistoryIcon className="w-3 h-3" />
                                {history.length} Saved Scans
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-48 glass-morphism animate-pulse bg-muted/20" />
                                ))}
                            </div>
                        ) : history.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                <AnimatePresence mode="popLayout">
                                    {history.map((item, index) => (
                                        <motion.div
                                            key={item._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group relative"
                                        >
                                            <div className="glass-morphism p-6 hover:border-brand-primary/30 transition-all duration-300 cursor-pointer overflow-hidden border border-border">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn(
                                                            "w-12 h-12 rounded-xl flex items-center justify-center font-black italic",
                                                            item.sentiment === "bullish" ? "bg-green-500/10 text-green-500" :
                                                                item.sentiment === "bearish" ? "bg-red-500/10 text-red-500" :
                                                                    "bg-foreground/10 text-foreground/50"
                                                        )}>
                                                            {item.sentiment === "bullish" ? <ArrowUpRight className="w-6 h-6" /> :
                                                                item.sentiment === "bearish" ? <ArrowDownRight className="w-6 h-6" /> :
                                                                    <TrendingUp className="w-6 h-6 opacity-30" />}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-black italic text-lg tracking-tight uppercase leading-none">{item.asset}</h4>
                                                            <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mt-1">{item.timeframe} Range</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-1.5 text-foreground/30 mb-1">
                                                            <Calendar className="w-3 h-3" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">{formatDate(item.createdAt)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-foreground/20 justify-end">
                                                            <Clock className="w-3 h-3" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">{formatTime(item.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-foreground/60 leading-relaxed font-medium line-clamp-2 mb-6 italic">
                                                    "{item.description}"
                                                </p>

                                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                    <div className="flex gap-2">
                                                        <div className="px-3 py-1 bg-muted/50 rounded-lg text-[10px] font-black uppercase tracking-widest text-foreground/40 border border-border/50">
                                                            Score: {item.confidence}%
                                                        </div>
                                                        {item.riskScore && (
                                                            <div className="px-3 py-1 bg-amber-500/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-amber-500 border border-amber-500/20">
                                                                Risk: {item.riskScore}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Link
                                                        href={`/?analysis=${item._id}`}
                                                        className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-brand-primary hover:gap-2 transition-all"
                                                    >
                                                        Details
                                                        <ChevronRight className="w-3 h-3" />
                                                    </Link>
                                                </div>

                                                <div className="absolute -right-2 -bottom-2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                                                    <HistoryIcon size={120} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="glass-morphism h-96 flex flex-col items-center justify-center text-center p-8 border-dashed border-2 border-border/50">
                                <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mb-6 text-foreground/10">
                                    <HistoryIcon size={40} />
                                </div>
                                <h3 className="text-xl font-black italic tracking-tight uppercase mb-2">No scans found</h3>
                                <p className="text-sm text-foreground/40 font-medium max-w-xs leading-relaxed">
                                    Start analyzing charts to see your history grow here. Every neural discovery is saved.
                                </p>
                                <Link
                                    href="/"
                                    className="mt-8 px-8 py-3 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 shadow-lg shadow-brand-primary/20"
                                >
                                    Start Analysis
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
