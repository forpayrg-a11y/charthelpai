"use client";

import React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { MarketTicker } from "@/components/ui/market-ticker";
import { Topbar } from "@/components/ui/topbar";
import { Shield, Scale, ScrollText } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
            <Sidebar onUpgrade={() => { }} />

            <main className="flex-1 flex flex-col overflow-hidden relative">
                <MarketTicker />
                <Topbar />

                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-4xl mx-auto space-y-8 pb-12">
                        <div>
                            <h2 className="text-2xl lg:text-4xl font-black italic tracking-tighter uppercase leading-none mb-2">
                                Terms of <span className="text-brand-primary">Service</span>
                            </h2>
                            <p className="text-[10px] lg:text-sm text-foreground/40 font-medium uppercase tracking-widest leading-relaxed">Last Updated: February 24, 2026</p>
                        </div>

                        <div className="glass-morphism p-6 lg:p-10 space-y-8 text-sm lg:text-base leading-relaxed text-foreground/80">
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-primary">
                                    <Scale className="w-5 h-5" />
                                    <h3 className="font-black italic tracking-tight uppercase text-lg">1. Agreement to Terms</h3>
                                </div>
                                <p>
                                    By accessing or using ChartHelpAI, operated by <strong>Gorvu LLC</strong>, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-primary">
                                    <Shield className="w-5 h-5" />
                                    <h3 className="font-black italic tracking-tight uppercase text-lg">2. Financial Disclaimer</h3>
                                </div>
                                <div className="bg-brand-primary/5 border-l-4 border-brand-primary p-4 italic font-medium">
                                    "The analyses, data, and information provided on ChartHelpAI are for educational and informational purposes only and <strong>do not constitute financial investment advice</strong>."
                                </div>
                                <p>
                                    ChartHelpAI uses artificial intelligence to scan charts. Past performance is not indicative of future results. You are solely responsible for your trading decisions and should consult with a qualified financial advisor before making any investment.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-primary">
                                    <ScrollText className="w-5 h-5" />
                                    <h3 className="font-black italic tracking-tight uppercase text-lg">3. Subscription & Payments</h3>
                                </div>
                                <p>
                                    We offer a paid PRO plan with advanced features. Payments are processed securely via Stripe. By subscribing, you agree to the automated recurring billing. You may cancel your subscription at any time through the billing portal.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h3 className="font-black italic tracking-tight uppercase text-lg">4. Limitation of Liability</h3>
                                <p>
                                    Gorvu LLC and its operators shall not be liable for any financial losses, damages, or consequences resulting from the use of our neural scanner or AI-generated insights.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h3 className="font-black italic tracking-tight uppercase text-lg">5. Contact Information</h3>
                                <p>
                                    For legal inquiries, please contact <strong>legal@gorvu.com</strong>.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
