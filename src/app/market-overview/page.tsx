"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { MarketTicker } from "@/components/market-ticker";
import { Topbar } from "@/components/topbar";
import {
    TrendingUp,
    TrendingDown,
    BarChart3,
    Globe,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MarketData {
    global: {
        total_market_cap: number;
        total_volume_24h: number;
        btc_dominance: number;
        eth_dominance: number;
        market_cap_change: number;
    };
    coins: any[];
}

export default function MarketOverviewPage() {
    const [data, setData] = useState<MarketData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/market");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Failed to fetch market data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    const formatCurrency = (val: number) => {
        if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
        if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
        return `$${(val / 1e6).toFixed(2)}M`;
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
            <Sidebar onUpgrade={() => { }} />

            <main className="flex-1 flex flex-col overflow-hidden relative">
                <MarketTicker />

                <Topbar />

                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
                        <div>
                            <h2 className="text-2xl lg:text-4xl font-black italic tracking-tighter uppercase leading-none mb-2">
                                Market <span className="text-brand-primary">Intelligence</span>
                            </h2>
                            <p className="text-[10px] lg:text-sm text-foreground/40 font-medium uppercase tracking-widest leading-relaxed">Real-time global crypto market metrics and performance.</p>
                        </div>

                        {data && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                                <StatCard
                                    label="Market Cap"
                                    value={formatCurrency(data.global.total_market_cap)}
                                    change={data.global.market_cap_change}
                                    icon={<Globe className="w-4 h-4" />}
                                />
                                <StatCard
                                    label="24h Volume"
                                    value={formatCurrency(data.global.total_volume_24h)}
                                    icon={<BarChart3 className="w-4 h-4" />}
                                />
                                <StatCard
                                    label="BTC Dominance"
                                    value={`${data.global.btc_dominance.toFixed(1)}%`}
                                    icon={<TrendingUp className="w-4 h-4" />}
                                />
                                <StatCard
                                    label="ETH Dominance"
                                    value={`${data.global.eth_dominance.toFixed(1)}%`}
                                    icon={<TrendingUp className="w-4 h-4 text-brand-secondary" />}
                                />
                            </div>
                        )}

                        <div className="glass-morphism overflow-hidden border border-border">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-0">
                                    <thead className="bg-muted/50 border-b border-border">
                                        <tr>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40 italic"># Asset</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40 italic">Price</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40 italic">24h Change</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40 italic">Market Cap</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40 italic text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {data?.coins.map((coin, i) => (
                                            <tr key={coin.id} className="hover:bg-muted/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-black italic text-foreground/20">{i + 1}</span>
                                                        <div>
                                                            <p className="font-black italic text-sm tracking-tight">{coin.name}</p>
                                                            <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">{coin.symbol}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-black italic text-sm">
                                                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={cn(
                                                        "flex items-center gap-1 font-black italic text-sm",
                                                        coin.percent_change_24h >= 0 ? "text-green-500" : "text-red-500"
                                                    )}>
                                                        {coin.percent_change_24h >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                                        {Math.abs(coin.percent_change_24h).toFixed(2)}%
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-bold text-foreground/60">
                                                    {formatCurrency(coin.market_cap)}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="px-4 py-1.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-brand-primary hover:text-white transition-all border border-brand-primary/20">
                                                        Analyze
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ label, value, change, icon }: { label: string, value: string, change?: number, icon: React.ReactNode }) {
    return (
        <div className="glass-morphism p-6 relative overflow-hidden group">
            <div className="flex items-center gap-2 text-foreground/40 mb-3">
                {icon}
                <span className="text-[10px] font-black uppercase tracking-widest italic">{label}</span>
            </div>
            <div className="flex items-end justify-between">
                <span className="text-2xl font-black italic tracking-tighter">{value}</span>
                {change !== undefined && (
                    <div className={cn(
                        "flex items-center gap-0.5 text-[10px] font-black italic",
                        change >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                        {change >= 0 ? "+" : ""}{change.toFixed(2)}%
                    </div>
                )}
            </div>
            <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                {React.cloneElement(icon as React.ReactElement, { className: "w-16 h-16" } as any)}
            </div>
        </div>
    );
}
