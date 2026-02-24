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

interface GeminiTickerItem {
    pair: string;
    price: string;
    percentChange24h: string;
}

const TRACKED_SYMBOLS = ["BTCUSD", "ETHUSD", "SOLUSD", "XRPUSD", "AVAXUSD", "LINKUSD", "PEPEUSD", "DOGEUSD"];

export const MarketTicker = () => {
    const [data, setData] = useState<TickerItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPrices = async () => {
        try {
            const response = await fetch("https://api.gemini.com/v1/pricefeed");
            const rawData: GeminiTickerItem[] = await response.json();

            const filteredData: TickerItem[] = rawData
                .filter(item => TRACKED_SYMBOLS.includes(item.pair))
                .map(item => ({
                    symbol: item.pair.replace("USD", "/USDT"),
                    price: parseFloat(item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    change: `${(parseFloat(item.percentChange24h) * 100).toFixed(1)}%`,
                    isUp: parseFloat(item.percentChange24h) >= 0
                }));

            // Sort by symbol to keep consistent order
            filteredData.sort((a, b) => a.symbol.localeCompare(b.symbol));

            setData(filteredData);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch Gemini prices:", error);
            // Fallback or keep previous data
        }
    };

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 15000); // 15s refresh
        return () => clearInterval(interval);
    }, []);

    if (loading && data.length === 0) {
        return <div className="w-full bg-muted/50 border-y border-border py-2 h-10 animate-pulse" />;
    }

    return (
        <div className="w-full bg-muted/50 border-y border-border overflow-hidden py-2 whitespace-nowrap">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="inline-flex gap-12 px-12"
            >
                {[...data, ...data].map((item, i) => (
                    <div key={`${item.symbol}-${i}`} className="flex items-center gap-3">
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
