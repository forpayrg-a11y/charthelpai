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

    useEffect(() => {
        const generateAlert = () => {
            const assets = ["BTC", "ETH", "SOL", "BNB", "XRP"];
            const amounts = ["2.5M", "1.2M", "500K", "10.4M", "1.8M"];
            const types: ("buy" | "sell")[] = ["buy", "sell"];

            const newAlert: Alert = {
                id: Math.random().toString(36).substr(2, 9),
                asset: assets[Math.floor(Math.random() * assets.length)],
                amount: amounts[Math.floor(Math.random() * amounts.length)],
                type: types[Math.floor(Math.random() * types.length)],
                time: "JUST NOW"
            };

            setAlerts(prev => [newAlert, ...prev].slice(0, 5));
        };

        const interval = setInterval(generateAlert, 5000);
        generateAlert(); // First alert

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-morphism p-6 space-y-4 h-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-secondary animate-pulse" />
                    <h4 className="font-bold text-sm tracking-widest uppercase text-foreground">Whale Alerts</h4>
                </div>
                <div className="bg-brand-secondary/10 px-2 py-0.5 rounded text-[10px] font-extrabold text-brand-secondary">
                    LIVE
                </div>
            </div>

            <div className="space-y-3">
                <AnimatePresence initial={false}>
                    {alerts.map((alert) => (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${alert.type === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                    {alert.type === 'buy' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                </div>
                                <div>
                                    <p className="text-xs font-black tracking-tight">{alert.asset}/USDT</p>
                                    <p className="text-[10px] text-foreground/40 font-bold uppercase">{alert.type === 'buy' ? 'Accumulation' : 'Distribution'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-brand-primary">${alert.amount}</p>
                                <p className="text-[10px] font-bold text-foreground/20 italic">{alert.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
