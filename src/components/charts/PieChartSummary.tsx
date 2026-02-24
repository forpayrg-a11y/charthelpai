"use client";

import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { motion } from "framer-motion";

interface PieData {
    name: string;
    value: number;
}

interface PieChartSummaryProps {
    data: PieData[];
    title?: string;
}

const COLORS = ["#22c55e", "#ef4444", "#6366f1", "#f59e0b"];

export const PieChartSummary = ({ data, title = "Sentiment Distribution" }: PieChartSummaryProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-morphism p-6 h-[400px] w-full"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg tracking-tight uppercase italic">{title}</h3>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        animationDuration={1500}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                        }}
                        itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}
                    />
                    <Legend wrapperStyle={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', fontWeight: 'bold' }} />
                </PieChart>
            </ResponsiveContainer>
        </motion.div>
    );
};
