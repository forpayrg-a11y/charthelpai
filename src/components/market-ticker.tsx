"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerItem {
    symbol: string;
    price: string;
    change: string;
    isUp: boolean;
}

const INITIAL_DATA: TickerItem[] = [
    { symbol: "BTC/USDT", price: "52,430.50", change: "+1.2%", isUp: true },
    { symbol: "ETH/USDT", price: "3,120.80", change: "-0.5%", isUp: false },
    { symbol: "SOL/USDT", price: "108.45", change: "+4.8%", isUp: true },
    { symbol: "ADA/USDT", price: "0.58", change: "+0.1%", isUp: true },
    { symbol: "DOT/USDT", price: "7.85", change: "-2.1%", isUp: false },
    { symbol: "AVAX/USDT", price: "38.20", change: "+0.9%", isUp: true },
];

export const MarketTicker = () => {
    const [data, setData] = useState(INITIAL_DATA);

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prev) =>
                prev.map((item) => ({
                    ...item,
                    price: (parseFloat(item.price.replace(',', '')) + (Math.random() - 0.5) * (parseFloat(item.price.replace(',', '')) * 0.001)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                }))
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full bg-white/5 border-y border-white/10 overflow-hidden py-2 whitespace-nowrap">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="inline-flex gap-12 px-12"
            >
                {[...data, ...data].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="font-bold text-[10px] text-foreground/50 tracking-widest">{item.symbol}</span>
                        <span className="font-black text-sm tabular-nums">${item.price}</span>
                        <span className={`flex items-center gap-0.5 text-[10px] font-black ${item.isUp ? "text-green-400" : "text-red-400"}`}>
                            {item.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {item.change}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};
