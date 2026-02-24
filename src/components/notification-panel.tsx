"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Bell,
    Zap,
    AlertTriangle,
    Info,
    ChevronRight,
    TrendingUp,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "alert" | "info" | "success" | "pro";
    read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        title: "Whale Alert: BTC Inflow",
        description: "Large volume of BTC detected moving to Binance. Prepare for volatility.",
        time: "2 mins ago",
        type: "alert",
        read: false
    },
    {
        id: "2",
        title: "Analysis Ready: ETH/USDT",
        description: "Your neural scan for ETH/USDT is complete. Signal: Bullish (85%).",
        time: "15 mins ago",
        type: "success",
        read: false
    },
    {
        id: "3",
        title: "Pro Feature Unlocked",
        description: "You now have access to Harmonic Pattern Discovery. Start scanning!",
        time: "1 hour ago",
        type: "pro",
        read: true
    },
    {
        id: "4",
        title: "Market Update",
        description: "Global crypto market cap increased by 2.4% in the last 24 hours.",
        time: "3 hours ago",
        type: "info",
        read: true
    }
];

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background border-l border-border z-[70] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-primary/10 rounded-lg">
                                    <Bell className="w-5 h-5 text-brand-primary" />
                                </div>
                                <div>
                                    <h3 className="font-black italic tracking-tight uppercase">Notifications</h3>
                                    <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest leading-none mt-1">
                                        Real-time Intelligence
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-muted rounded-xl transition-colors text-foreground/40"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            <div className="flex items-center justify-between px-2 mb-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20">Recent Activity</p>
                                <button className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:opacity-70 transition-opacity">
                                    Mark all as read
                                </button>
                            </div>

                            {MOCK_NOTIFICATIONS.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={cn(
                                        "group p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden",
                                        notification.read
                                            ? "bg-muted/30 border-border/50 opacity-60"
                                            : "bg-background border-border hover:border-brand-primary/30 hover:shadow-lg shadow-brand-primary/5"
                                    )}
                                >
                                    <div className="flex gap-4 relative z-10">
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                            notification.type === "alert" && "bg-red-500/10 text-red-500",
                                            notification.type === "success" && "bg-green-500/10 text-green-500",
                                            notification.type === "pro" && "bg-amber-500/10 text-amber-500",
                                            notification.type === "info" && "bg-blue-500/10 text-blue-500"
                                        )}>
                                            {notification.type === "alert" && <Zap className="w-5 h-5" />}
                                            {notification.type === "success" && <TrendingUp className="w-5 h-5" />}
                                            {notification.type === "pro" && <Sparkles className="w-5 h-5" />}
                                            {notification.type === "info" && <Info className="w-5 h-5" />}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-bold text-sm truncate uppercase tracking-tight italic">
                                                    {notification.title}
                                                </h4>
                                                {!notification.read && (
                                                    <span className="w-2 h-2 bg-brand-primary rounded-full" />
                                                )}
                                            </div>
                                            <p className="text-xs text-foreground/50 leading-relaxed font-medium mb-2">
                                                {notification.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">
                                                    {notification.time}
                                                </span>
                                                <ChevronRight className="w-3 h-3 text-foreground/10 group-hover:text-brand-primary transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    {!notification.read && (
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-brand-primary/10 to-transparent -mr-8 -mt-8 rounded-full blur-xl" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-6 border-t border-border bg-muted/10">
                            <button className="w-full py-4 bg-muted hover:bg-muted/80 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 transition-all border border-border">
                                System Status: Optimal
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
