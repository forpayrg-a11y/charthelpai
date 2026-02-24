"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnalysisCardProps {
    title: string;
    sentiment: "bullish" | "bearish" | "neutral";
    confidence: number;
    description: string;
    patterns?: string[];
}

export const AnalysisCard = ({ title, sentiment, confidence, description, patterns }: AnalysisCardProps) => {
    const getSentimentStyles = () => {
        switch (sentiment) {
            case "bullish":
                return {
                    icon: <TrendingUp className="text-green-500" />,
                    color: "text-green-500",
                    bg: "bg-green-500/10",
                    border: "border-green-500/20"
                };
            case "bearish":
                return {
                    icon: <TrendingDown className="text-red-500" />,
                    color: "text-red-500",
                    bg: "bg-red-500/10",
                    border: "border-red-500/20"
                };
            default:
                return {
                    icon: <Minus className="text-gray-400" />,
                    color: "text-gray-400",
                    bg: "bg-gray-400/10",
                    border: "border-gray-400/20"
                };
        }
    };

    const styles = getSentimentStyles();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-morphism p-6 flex flex-col gap-4 group hover:border-brand-primary/30 transition-colors"
        >
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg tracking-tight">{title}</h3>
                <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", styles.bg, styles.color, styles.border, "border")}>
                    {sentiment}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-foreground/40 uppercase">AI Confidence</span>
                        <span className="text-xs font-black">{confidence}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${confidence}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={cn("h-full rounded-full", styles.bg.replace('/10', ''))}
                        />
                    </div>
                </div>
            </div>

            <p className="text-sm text-foreground/70 leading-relaxed font-medium">
                {description}
            </p>

            {patterns && patterns.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {patterns.map((pattern, i) => (
                        <span key={i} className="px-2 py-1 bg-muted rounded-md text-[10px] font-bold text-brand-primary border border-border">
                            #{pattern}
                        </span>
                    ))}
                </div>
            )}

            <div className="pt-4 mt-auto border-t border-border flex flex-col gap-3">
                <div className="flex items-center justify-between opacity-50">
                    <div className="flex items-center gap-2">
                        {styles.icon}
                        <span className="text-[10px] font-bold uppercase tracking-widest">Technicals</span>
                    </div>
                    <Info className="w-4 h-4 cursor-help" />
                </div>
                <p className="text-[9px] text-foreground/30 font-medium italic leading-tight text-center">
                    Not financial advice. Trade at your own risk.
                </p>
            </div>
        </motion.div>
    );
};
