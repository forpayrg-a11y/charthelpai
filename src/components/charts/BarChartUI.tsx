"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { motion } from "framer-motion";

interface BarData {
    name: string;
    value: number;
}

interface BarChartUIProps {
    data: BarData[];
    title?: string;
    color?: string;
}

export const BarChartUI = ({ data, title = "Volume Analysis", color = "#6366f1" }: BarChartUIProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-morphism p-6 h-[400px] w-full"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg tracking-tight uppercase italic">{title}</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-secondary/50" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">Structural Flow</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                    />
                    <YAxis hide />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                        }}
                        itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}
                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={color} fillOpacity={0.4 + (index / data.length) * 0.6} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};
