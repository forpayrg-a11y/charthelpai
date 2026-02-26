"use client";

import React, { useState } from "react";
import { Check, Sparkles, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface PricingCardsProps {
    onUpgrade: (priceId: string) => void;
    currentPlan?: string;
}

const PLANS = [
    {
        name: "Pro Monthly",
        price: "$10",
        description: "Flexible access to all premium features.",
        priceId: "price_1T51ICDQs25Uuz0jKxoT4rwl",
        features: [
            "Real-time Whale Alerts",
            "Advanced Harmonic Patterns",
            "Unlimited AI Scans",
            "Support & Resistance Zones",
        ],
        badge: "Most Flexible",
    },
    {
        name: "Pro Yearly",
        price: "$100",
        description: "Best value for dedicated traders.",
        priceId: "price_1T51ICDQs25Uuz0jhd9Auc82",
        features: [
            "Everything in Monthly",
            "2 Months for FREE",
            "Priority AI Processing",
            "Dedicated Support",
        ],
        badge: "Best Value",
        highlight: true,
    },
];

export const PricingCards = ({ onUpgrade, currentPlan }: PricingCardsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
            {PLANS.map((plan) => (
                <motion.div
                    key={plan.name}
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-6 rounded-3xl border transition-all duration-300 flex flex-col ${plan.highlight
                        ? "bg-brand-primary/10 border-brand-primary/50 shadow-lg shadow-brand-primary/5"
                        : "bg-muted/50 border-border/50"
                        }`}
                >
                    {plan.badge && (
                        <div className={`absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${plan.highlight ? "bg-brand-primary text-white" : "bg-foreground/10 text-foreground/60"
                            }`}>
                            {plan.badge}
                        </div>
                    )}

                    <div className="mb-6">
                        <h4 className="text-lg font-black tracking-tight mb-1 uppercase italic">{plan.name}</h4>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black">{plan.price}</span>
                            <span className="text-xs text-foreground/40 font-bold uppercase tracking-widest">
                                / {plan.name.includes("Monthly") ? "month" : "year"}
                            </span>
                        </div>
                        <p className="text-[10px] text-foreground/60 font-medium mt-2">{plan.description}</p>
                    </div>

                    <div className="space-y-3 flex-1 mb-8">
                        {plan.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2">
                                <div className={`p-1 rounded-lg ${plan.highlight ? "bg-brand-primary/20 text-brand-primary" : "bg-foreground/10 text-foreground/40"}`}>
                                    <Check className="w-3 h-3" />
                                </div>
                                <span className="text-[11px] font-bold text-foreground/80">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => onUpgrade(plan.priceId)}
                        disabled={currentPlan === plan.name.toLowerCase()}
                        className={`w-full h-12 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-95 ${plan.highlight
                            ? "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20"
                            : "bg-foreground text-background hover:opacity-90"
                            } disabled:opacity-50 disabled:grayscale`}
                    >
                        {plan.highlight ? <Sparkles className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                        {currentPlan === plan.name.toLowerCase() ? "Current Plan" : "Get Started"}
                    </button>
                </motion.div>
            ))}
        </div>
    );
};
