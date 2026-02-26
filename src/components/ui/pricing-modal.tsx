"use client";

import React from "react";
import { X } from "lucide-react";
import { PricingCards } from "./pricing-cards";
import { useUIStore } from "@/store";

interface PricingModalProps {
    onUpgrade: (priceId: string) => void;
}

export const PricingModal = ({ onUpgrade }: PricingModalProps) => {
    const { isPricingModalOpen, setPricingModalOpen } = useUIStore();

    if (!isPricingModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl" onClick={() => setPricingModalOpen(false)}>
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-muted/90 border border-border/50 rounded-[40px] p-8 lg:p-12 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => setPricingModalOpen(false)}
                    className="absolute top-8 right-8 p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-5xl font-black italic tracking-tighter uppercase mb-2 leading-tight">
                        Choose Your <span className="text-brand-primary">Edge</span>
                    </h2>
                    <p className="text-sm text-foreground/40 font-bold uppercase tracking-widest">
                        Unlock the full potential of ChartHelp neural network.
                    </p>
                </div>

                <PricingCards onUpgrade={(pid) => {
                    onUpgrade(pid);
                    setPricingModalOpen(false);
                }} />

                <p className="text-center text-[10px] text-foreground/20 font-bold uppercase tracking-[0.2em] mt-12">
                    Secure Payment Powered by Stripe • Cancel Anytime
                </p>
            </div>
        </div>
    );
};
