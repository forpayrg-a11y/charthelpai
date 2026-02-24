"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { MarketTicker } from "@/components/market-ticker";
import { Topbar } from "@/components/topbar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    User,
    CreditCard,
    Settings as SettingsIcon,
    ShieldCheck,
    ExternalLink,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    useUser
} from "@clerk/nextjs";
import { useUserStore } from "@/store";

export default function SettingsPage() {
    const { user: clerkUser } = useUser();
    const { isPro, setUser } = useUserStore();
    const [loadingPortal, setLoadingPortal] = useState(false);

    useEffect(() => {
        // Sync pro status (simplified for demo, in real it should fetch from our DB)
        const checkPro = async () => {
            try {
                const response = await fetch("/api/user/sync");
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Failed to sync user:", error);
            }
        };
        checkPro();
    }, []);

    const handleManageBilling = async () => {
        setLoadingPortal(true);
        try {
            const response = await fetch("/api/stripe/portal", { method: "POST" });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Could not load billing portal. Make sure you have an active subscription.");
            }
        } catch (error) {
            console.error("Portal error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoadingPortal(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
            <Sidebar onUpgrade={() => { }} />

            <main className="flex-1 flex flex-col overflow-hidden relative">
                <MarketTicker />

                <Topbar />

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div>
                            <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none mb-2">
                                System <span className="text-brand-primary">Settings</span>
                            </h2>
                            <p className="text-sm text-foreground/40 font-medium">Manage your account, billing, and application preferences.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Account Section */}
                            <div className="md:col-span-2 space-y-6">
                                <div className="glass-morphism p-8 space-y-6 relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-brand-primary/10 rounded-lg">
                                            <User className="w-5 h-5 text-brand-primary" />
                                        </div>
                                        <h3 className="font-black italic tracking-tight uppercase text-lg">Profile Information</h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Display Name</p>
                                            <p className="font-bold">{clerkUser?.fullName || "Not set"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Email Address</p>
                                            <p className="font-bold">{clerkUser?.primaryEmailAddress?.emailAddress}</p>
                                        </div>
                                        <div className="space-y-1 text-green-500">
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Account Status</p>
                                            <div className="flex items-center gap-1.5 font-bold">
                                                <ShieldCheck className="w-4 h-4" />
                                                Verified
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute -right-8 -top-8 text-foreground/5 opacity-[0.03]">
                                        <User size={160} />
                                    </div>
                                </div>

                                <div className="glass-morphism p-8 space-y-6 relative overflow-hidden">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-amber-500/10 rounded-lg">
                                            <CreditCard className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <h3 className="font-black italic tracking-tight uppercase text-lg">Status Plan</h3>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border/50">
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black italic",
                                                isPro ? "bg-brand-primary text-white" : "bg-muted text-foreground/30"
                                            )}>
                                                {isPro ? "P" : "F"}
                                            </div>
                                            <div>
                                                <p className="font-black italic tracking-tight">{isPro ? "PRO PLAN" : "FREE PLAN"}</p>
                                                <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                                                    {isPro ? "Full Neural Access" : "Basic Scanner Access"}
                                                </p>
                                            </div>
                                        </div>
                                        {isPro && (
                                            <div className="flex items-center gap-2 text-green-500 font-bold text-xs">
                                                <CheckCircle2 className="w-4 h-4" />
                                                Active
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                        {isPro ? (
                                            <button
                                                onClick={handleManageBilling}
                                                disabled={loadingPortal}
                                                className="px-6 py-3 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                            >
                                                {loadingPortal ? "Loading..." : "Manage Billing"}
                                                <ExternalLink className="w-3 h-3" />
                                            </button>
                                        ) : (
                                            <button className="px-6 py-3 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand-primary/20">
                                                Upgrade to PRO
                                            </button>
                                        )}
                                    </div>

                                    <div className="absolute -right-8 -top-8 text-foreground/5 opacity-[0.03]">
                                        <CreditCard size={160} />
                                    </div>
                                </div>
                            </div>

                            {/* Preferences Section */}
                            <div className="space-y-6">
                                <div className="glass-morphism p-8 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-brand-secondary/10 rounded-lg">
                                            <SettingsIcon className="w-5 h-5 text-brand-secondary" />
                                        </div>
                                        <h3 className="font-black italic tracking-tight uppercase text-lg">Preferences</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs font-bold italic">Dark Mode</p>
                                                <p className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest">Toggle UI Appearance</p>
                                            </div>
                                            <ThemeToggle />
                                        </div>
                                        <div className="h-[1px] bg-border/50" />
                                        <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                                            <div>
                                                <p className="text-xs font-bold italic">Push Notifications</p>
                                                <p className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest">Alpha Feature</p>
                                            </div>
                                            <div className="w-10 h-5 bg-muted rounded-full relative">
                                                <div className="absolute left-1 top-1 w-3 h-3 bg-foreground/20 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-morphism p-8 space-y-4 bg-gradient-to-br from-brand-primary/5 to-transparent border-brand-primary/20">
                                    <h4 className="font-black italic tracking-tight uppercase">Need Help?</h4>
                                    <p className="text-[10px] text-foreground/40 font-bold leading-relaxed uppercase tracking-widest">
                                        If you have any questions or encounter issues, please contact our support team.
                                    </p>
                                    <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
