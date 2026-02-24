"use client";

import React, { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { NotificationPanel } from "./notification-panel";
import { useUIStore } from "@/store";
import {
    UserButton,
    SignedIn,
    SignedOut,
    SignInButton
} from "@clerk/nextjs";

export const Topbar = () => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { toggleSidebar } = useUIStore();

    return (
        <header className="h-20 flex items-center justify-between px-4 lg:px-8 bg-background/50 backdrop-blur-md border-b border-border/50 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2.5 lg:hidden glass rounded-xl border border-border hover:border-brand-primary/30 transition-all"
                >
                    <Menu className="w-5 h-5 text-foreground/70" />
                </button>

                <div className="hidden sm:flex items-center gap-4 bg-muted/50 border border-border px-5 py-2.5 rounded-2xl w-64 lg:w-96 group focus-within:border-brand-primary/50 transition-all">
                    <Search className="w-4 h-4 text-foreground/30 group-focus-within:text-brand-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search market..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-foreground/20 font-medium"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />

                <button
                    onClick={() => setIsNotificationsOpen(true)}
                    className="p-3 glass rounded-xl relative border border-border group hover:border-brand-primary/30 transition-all"
                >
                    <Bell className="w-5 h-5 text-foreground/70 group-hover:text-brand-primary transition-colors" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background animate-pulse" />
                </button>

                <div className="h-8 w-px bg-border/50 mx-2" />

                <SignedIn>
                    <UserButton
                        appearance={{
                            variables: {
                                colorBackground: "#15202b",
                                colorText: "#ffffff",
                                colorTextSecondary: "#8899a6",
                                colorPrimary: "#1da1f2",
                                borderRadius: "1rem",
                            },
                            elements: {
                                avatarBox: "w-10 h-10 rounded-lg shadow-lg border border-border",
                                userButtonPopoverCard: "bg-[#15202b] border border-[#38444d] shadow-2xl rounded-2xl overflow-hidden",
                                userButtonPopoverActionButton: "hover:bg-[#192734] transition-colors px-4 py-3 border-b border-[#38444d]/50 last:border-none",
                                userButtonPopoverActionButtonText: "!text-white !font-bold text-sm",
                                userButtonPopoverActionButtonIcon: "!text-white/80",
                                userButtonOuterIdentifier: "!text-white !font-bold",
                                userButtonPopoverFooter: "hidden",
                                userPreviewMainIdentifier: "!text-white !font-bold text-base",
                                userPreviewSecondaryIdentifier: "!text-[#8899a6] !font-bold",
                                userButtonPopoverActions: "bg-transparent",
                            }
                        }}
                    />
                </SignedIn>

                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="px-6 py-2.5 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-xl hover:opacity-90 shadow-lg shadow-brand-primary/20 transition-all active:scale-95">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>
            </div>

            <NotificationPanel
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
            />
        </header>
    );
};
