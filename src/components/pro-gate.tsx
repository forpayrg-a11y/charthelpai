"use client";

import React from "react";
import { Sparkles, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface ProGateProps {
    children: React.ReactNode;
    isPro?: boolean;
    featureName?: string;
}

export const ProGate = ({ children, isPro = false, featureName = "Advanced Analysis" }: ProGateProps) => {
    if (isPro) return <>{children}</>;

    return (
        <div className="relative group">
            <div className="filter blur-md grayscale pointer-events-none opacity-40">
                {children}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/20 backdrop-blur-[2px] rounded-3xl z-10">
                <div className="p-3 rounded-2xl bg-brand-primary/20 text-brand-primary mb-4">
                    <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-black text-lg tracking-tight mb-2">PRO Feature</h4>
                <p className="text-xs text-foreground/60 mb-6 max-w-[200px]">
                    Upgrade to PRO to unlock {featureName} and detailed harmonic patterns.
                </p>
                <button className="flex items-center gap-2 bg-brand-primary text-white text-[10px] font-black h-10 px-6 rounded-xl hover:opacity-90 transition-opacity">
                    <Sparkles className="w-3 h-3" />
                    UPGRADE NOW
                </button>
            </div>
        </div>
    );
};
