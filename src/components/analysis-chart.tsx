"use client";

import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

interface ChartData {
    time: string;
    price: number;
}

interface AnalysisChartProps {
    data: ChartData[];
    sentiment: "bullish" | "bearish" | "neutral";
}

export const AnalysisChart = ({ data, sentiment }: AnalysisChartProps) => {
    const gradientColor = sentiment === "bullish" ? "#22c55e" : sentiment === "bearish" ? "#ef4444" : "#6366f1";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-morphism p-6 h-[400px] w-full"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg tracking-tight">Market Visualization</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: gradientColor }} />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">Real-time Simulation</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                    />
                    <YAxis
                        hide
                        domain={['auto', 'auto']}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            backdropFilter: "blur(4px)"
                        }}
                        itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}
                        labelStyle={{ display: "none" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke={gradientColor}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        animationDuration={2000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </motion.div>
    );
};
