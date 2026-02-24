"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, Target, ShieldX, CheckCircle2, Zap } from "lucide-react";

interface Level {
    label: string;
    price: string | number;
    type: "entry" | "sl" | "tp";
}

export const TradePlan = ({ levels }: { levels: Level[] }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-morphism overflow-hidden"
        >
            <div className="bg-muted p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                    <Target className="w-4 h-4 text-brand-primary" />
                    Execution Plan
                </h3>
                <div className="text-xs px-2 py-1 bg-brand-primary/20 text-brand-primary rounded-full font-bold">
                    RRR 1:3.2
                </div>
            </div>
            <div className="p-4 space-y-4">
                {levels.map((level, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${level.type === 'entry' ? 'bg-blue-500/10 text-blue-400' :
                                level.type === 'sl' ? 'bg-red-500/10 text-red-400' :
                                    'bg-green-500/10 text-green-400'
                                }`}>
                                {level.type === 'entry' && <Zap className="w-4 h-4" />}
                                {level.type === 'sl' && <ShieldX className="w-4 h-4" />}
                                {level.type === 'tp' && <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <span className="text-sm font-medium text-foreground/70">{level.label}</span>
                        </div>
                        <span className="text-lg font-mono font-bold tracking-tight group-hover:text-brand-primary transition-colors">
                            {level.price}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

