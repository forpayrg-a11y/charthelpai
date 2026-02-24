"use client";

import React from "react";
import { Zap, Activity, ShieldAlert, Target } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuickInsightsProps {
    volatility: "Low" | "Medium" | "High" | string;
    trendAlignment: "Weak" | "Neutral" | "Strong" | string;
    riskScore: string;
    className?: string;
}

export const QuickInsights = ({ volatility, trendAlignment, riskScore, className }: QuickInsightsProps) => {
    const getVolatilityColor = (v: string) => {
        if (v === "High") return "text-red-500 bg-red-500/10 border-red-500/20";
        if (v === "Medium") return "text-amber-500 bg-amber-500/10 border-amber-500/20";
        return "text-green-500 bg-green-500/10 border-green-500/20";
    };

    const getTrendColor = (t: string) => {
        if (t === "Strong") return "text-green-500 bg-green-500/10 border-green-500/20";
        if (t === "Neutral") return "text-amber-500 bg-amber-500/10 border-amber-500/20";
        return "text-red-500 bg-red-500/10 border-red-500/20";
    };

    const getRiskColor = (s: string) => {
        if (s.startsWith("A")) return "text-green-500 bg-green-500/10 border-green-500/20";
        if (s.startsWith("B")) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
        return "text-red-500 bg-red-500/10 border-red-500/20";
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 w-full", className)}
        >
            <InsightCard
                icon={<Activity className="w-4 h-4" />}
                label="Market Volatility"
                value={volatility}
                statusColor={getVolatilityColor(volatility)}
            />
            <InsightCard
                icon={<Target className="w-4 h-4" />}
                label="Trend Alignment"
                value={trendAlignment}
                statusColor={getTrendColor(trendAlignment)}
            />
            <InsightCard
                icon={<ShieldAlert className="w-4 h-4" />}
                label="Risk Score"
                value={riskScore}
                statusColor={getRiskColor(riskScore)}
            />
        </motion.div>
    );
};

interface InsightCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    statusColor: string;
}

const InsightCard = ({ icon, label, value, statusColor }: InsightCardProps) => (
    <div className="glass-morphism p-4 flex flex-col gap-2 relative overflow-hidden group">
        <div className="flex items-center gap-2 text-foreground/40">
            {icon}
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-black italic tracking-tighter">{value}</span>
            <div className={cn("px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border", statusColor)}>
                Live Data
            </div>
        </div>
        {/* Subtle decorative background icon */}
        <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
            {React.cloneElement(icon as any, {
                className: "w-16 h-16"
            })}
        </div>
    </div>
);
