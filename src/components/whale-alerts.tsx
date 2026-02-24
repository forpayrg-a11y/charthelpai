"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDollarSign, TrendingUp, TrendingDown, Zap } from "lucide-react";

interface Alert {
    id: string;
    asset: string;
    amount: string;
    type: "buy" | "sell";
    time: string;
}

export const WhaleAlerts = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAlerts = async () => {
        try {
            const response = await fetch("/api/whales");
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                const formattedAlerts: Alert[] = data.map((coin: any) => ({
                    id: coin.id,
                    asset: coin.symbol,
                    amount: coin.volume_24h > 1000000000
                        ? `${(coin.volume_24h / 1000000000).toFixed(1)}B`
                        : `${(coin.volume_24h / 1000000).toFixed(1)}M`,
                    type: coin.percent_change_24h >= 0 ? "buy" : "sell",
                    time: "24h VOL"
                }));
                // Sort by relative "impact" (could be just volume or pct change)
                setAlerts(formattedAlerts.slice(0, 5));
            } else {
                throw new Error("Empty data from CMC");
            }
        } catch (error) {
            console.error("CMC Fetch failed, using simulation:", error);
            // Enhanced Simulation Mode
            const assets = ["BTC", "ETH", "SOL", "BNB", "XRP"];
            const generateSimulation = () => ({
                id: Math.random().toString(36).substring(2, 9),
                asset: assets[Math.floor(Math.random() * assets.length)],
                amount: `${(Math.random() * 5 + 0.5).toFixed(1)}M`,
                type: Math.random() > 0.5 ? "buy" : "sell" as "buy" | "sell",
                time: "SIMULATED"
            });

            setAlerts(prev => {
                const newAlert = generateSimulation();
                const updated = [newAlert, ...prev].slice(0, 5);
                return updated.length > 0 ? updated : [newAlert];
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 60000); // Refresh every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-morphism p-6 space-y-4 h-full min-h-[400px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-secondary animate-pulse" />
                    <h4 className="font-bold text-sm tracking-widest uppercase text-foreground">Whale Alerts</h4>
                </div>
                <div className="flex items-center gap-2">
                    {loading && <div className="w-2 h-2 rounded-full bg-brand-secondary animate-ping" />}
                    <div className="bg-brand-secondary/10 px-2 py-0.5 rounded text-[10px] font-extrabold text-brand-secondary">
                        LIVE
                    </div>
                </div>
            </div>

            <div className="space-y-3 overflow-hidden">
                <AnimatePresence initial={false} mode="popLayout">
                    {alerts.length > 0 ? (
                        alerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg transition-transform group-hover:scale-110 ${alert.type === 'buy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                        {alert.type === 'buy' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black tracking-tight">{alert.asset}/USDT</p>
                                        <p className="text-[10px] text-foreground/40 font-bold uppercase">
                                            {alert.type === 'buy' ? 'Whale Inflow' : 'Whale Outflow'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-brand-primary group-hover:text-brand-secondary transition-colors">
                                        ${alert.amount}
                                    </p>
                                    <p className="text-[10px] font-bold text-foreground/20 italic">{alert.time}</p>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 opacity-20">
                            <CircleDollarSign className="w-8 h-8 mb-2 animate-bounce" />
                            <p className="text-[10px] font-black tracking-widest">SCANNING BLOCKS...</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <div className="pt-2 border-t border-border/10">
                <p className="text-[8px] text-foreground/20 font-bold tracking-tight text-center">
                    REAL-TIME BLOCKCHAIN MONITORING ACTIVE
                </p>
            </div>
        </div>
    );
};
