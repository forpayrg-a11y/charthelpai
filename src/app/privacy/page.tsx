"use client";

import React from "react";
import { Sidebar } from "@/components/sidebar";
import { MarketTicker } from "@/components/market-ticker";
import { Topbar } from "@/components/topbar";
import { Lock, Eye, Database } from "lucide-react";

export default function PrivacyPage() {
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
                                Privacy <span className="text-brand-primary">Policy</span>
                            </h2>
                            <p className="text-[10px] lg:text-sm text-foreground/40 font-medium uppercase tracking-widest leading-relaxed">Last Updated: February 24, 2026</p>
                        </div>

                        <div className="glass-morphism p-6 lg:p-10 space-y-8 text-sm lg:text-base leading-relaxed text-foreground/80">
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-primary">
                                    <Eye className="w-5 h-5" />
                                    <h3 className="font-black italic tracking-tight uppercase text-lg">1. Data Collection</h3>
                                </div>
                                <p>
                                    ChartHelpAI, operated by <strong>Gorvu LLC</strong>, collects limited personal data to provide our services. This includes your email and name (via Clerk) and payment information (processed securely via Stripe).
                                </p>
                            </section>

                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-primary">
                                    <Database className="w-5 h-5" />
                                    <h3 className="font-black italic tracking-tight uppercase text-lg">2. How We Use Data</h3>
                                </div>
                                <p>
                                    We use your data to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Authenticate your account and protect your data.</li>
                                    <li>Manage your PRO subscription and processing payments.</li>
                                    <li>Store your neural scan history for your personal review.</li>
                                    <li>Improve our neural scanner algorithms.</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-primary">
                                    <Lock className="w-5 h-5" />
                                    <h3 className="font-black italic tracking-tight uppercase text-lg">3. Third-Party Services</h3>
                                </div>
                                <p>
                                    We utilize industry-standard third-party providers:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Clerk:</strong> For identity management and authentication.</li>
                                    <li><strong>Stripe:</strong> For secure payment processing.</li>
                                    <li><strong>Google Gemini:</strong> To power our neural analysis engine.</li>
                                    <li><strong>MongoDB Atlas:</strong> For secure database storage.</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h3 className="font-black italic tracking-tight uppercase text-lg">4. Data Security</h3>
                                <p>
                                    We take reasonable measures to protect your information from unauthorized access or disclosure. However, no internet transmission is ever 100% secure.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h3 className="font-black italic tracking-tight uppercase text-lg">5. Contact Us</h3>
                                <p>
                                    If you have questions about your privacy, please contact <strong>privacy@gorvu.com</strong>.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
