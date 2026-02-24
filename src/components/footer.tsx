"use client";

import React from "react";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full border-t border-border bg-background/50 backdrop-blur-xl py-8 px-4 lg:px-8 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
                {/* Branding & Logo */}
                <div className="flex flex-col items-center text-center gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
                            <BrainCircuit className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-black italic tracking-tighter uppercase whitespace-nowrap">
                            CHART<span className="text-brand-primary">HELP</span>
                        </h3>
                    </div>
                </div>

                {/* Main Legal Disclaimer */}
                <div className="max-w-3xl text-center space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20">Legal Disclaimer</p>
                    <p className="text-xs lg:text-sm text-foreground/40 font-medium italic leading-relaxed">
                        The analyses, data, and information provided on this platform are for educational and informational purposes only and <strong className="text-foreground/60">do not constitute financial investment advice</strong>. Trading involves significant risk. Always consult with a professional financial advisor.
                    </p>
                </div>

                {/* Links & Company Info */}
                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 pt-4 border-t border-border/30">
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-foreground/40">
                        <Link href="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
                        <a href="mailto:support@gorvu.com" className="hover:text-brand-primary transition-colors">Support</a>
                    </div>

                    <div className="text-[10px] font-black uppercase tracking-widest text-foreground/20">
                        © 2026 <span className="text-foreground/40">Gorvu LLC</span>. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};
