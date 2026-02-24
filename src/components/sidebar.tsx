"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    History,
    LineChart,
    Settings,
    BrainCircuit,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store";

interface SidebarProps {
    onUpgrade: () => void;
}

export const Sidebar = ({ onUpgrade }: SidebarProps) => {
    const pathname = usePathname();
    const { isPro } = useUserStore();

    return (
        <aside className="w-20 lg:w-72 border-r border-border bg-muted/30 flex flex-col transition-all duration-300 relative z-40 backdrop-blur-xl">
            <div className="p-6 flex items-center gap-3">
                <div className={cn(
                    "w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20 relative",
                    isPro && "pro-plan-border pro-glow"
                )}>
                    <BrainCircuit className="w-6 h-6 text-white" />
                    {isPro && (
                        <div className="absolute -top-1 -right-1 bg-amber-500 text-[8px] font-black px-1.5 py-0.5 rounded-full text-white border-2 border-background shadow-xl">
                            PRO
                        </div>
                    )}
                </div>
                <div className="hidden lg:block">
                    <h1 className="text-xl font-black italic tracking-tighter leading-none">
                        CHART<span className="text-brand-primary">HELP</span>
                    </h1>
                    <p className="text-[8px] font-black tracking-[0.2em] text-foreground/40 uppercase">Neural Scanner</p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 py-4">
                <NavItem
                    href="/"
                    icon={<LayoutDashboard />}
                    label="Dashboard"
                    active={pathname === "/"}
                />
                <NavItem
                    href="/history"
                    icon={<History />}
                    label="Analysis History"
                    active={pathname === "/history"}
                />
                <NavItem
                    href="/market-overview"
                    icon={<LineChart />}
                    label="Market Overview"
                    active={pathname === "/market-overview"}
                />
                <NavItem
                    href="/settings"
                    icon={<Settings />}
                    label="Settings"
                    active={pathname === "/settings"}
                />
            </nav>

            <div className="p-4 mt-auto">
                <div className="glass p-5 rounded-2xl hidden lg:block border border-border bg-gradient-to-br from-muted/50 to-transparent">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-brand-secondary" />
                        <p className="text-[10px] font-black text-brand-secondary tracking-widest uppercase">PRO PLAN</p>
                    </div>
                    <p className="text-[10px] text-foreground/50 leading-tight font-medium">Unlock harmonic patterns & whale alerts.</p>
                    <button
                        onClick={onUpgrade}
                        className="w-full mt-4 bg-brand-primary text-white text-[10px] font-bold py-3 rounded-xl transition-all shadow-lg shadow-brand-primary/20 hover:opacity-90"
                    >
                        {isPro ? "Current: PRO" : "Upgrade Now"}
                    </button>
                </div>
            </div>
        </aside>
    );
};

function NavItem({
    href,
    icon,
    label,
    active = false
}: {
    href: string,
    icon: React.ReactElement,
    label: string,
    active?: boolean
}) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer group",
                active
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                    : "text-foreground/40 hover:bg-muted hover:text-foreground/70"
            )}
        >
            {React.cloneElement(icon, {
                className: cn("w-5 h-5", !active && "group-hover:scale-110 transition-transform")
            } as any)}
            <span className="font-bold text-sm hidden lg:block">{label}</span>
        </Link>
    );
}
