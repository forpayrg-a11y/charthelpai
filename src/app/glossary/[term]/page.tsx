import { Metadata } from 'next';
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { MarketTicker } from "@/components/market-ticker";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";
import Link from 'next/link';

interface PageProps {
    params: { term: string };
}

// SEO Strategy: Semantic URL & Metadata
// Targeting "what is [term]" or "[term] meaning" keywords.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const term = params.term.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return {
        title: `What is ${term}? | Technical Analysis Glossary`,
        description: `Learn everything about ${term} in trading. Definition, how to use it in technical analysis, and examples on real charts.`,
        keywords: [term, 'technical analysis', 'trading terms', 'glossary'],
    };
}

export default function GlossaryPage({ params }: PageProps) {
    const term = params.term.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            <Sidebar onUpgrade={() => { }} />

            <main className="flex-1 flex flex-col overflow-hidden relative">
                <MarketTicker />
                <Topbar />

                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-3xl mx-auto space-y-12">
                        {/* 1. Header Section */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-primary">
                                <BookOpen className="w-3 h-3" />
                                Trading Glossary
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-tight">
                                {term}
                            </h1>
                        </div>

                        {/* 2. Content Section (Semantic HTML) */}
                        <article className="prose prose-invert max-w-none">
                            <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed font-medium italic">
                                "{term} is a critical component of technical analysis used by professional traders to identify potential market reversals and trend continuations."
                            </p>

                            <div className="h-px bg-border my-8" />

                            <h2 className="text-2xl font-black italic uppercase tracking-tight text-brand-primary mb-4">How to Use {term}</h2>
                            <p className="text-foreground/60 leading-loose">
                                When analyzing this pattern, traders look for specific volume signatures and price confirmations.
                                Our AI engine at ChartHelpAI is trained on millions of historical instances of {term.toLowerCase()}
                                to provide you with the most accurate probability scores.
                                <br /><br />
                                By identifying {term} programmatically, our tool removes human bias and emotional trading during volatile market sessions.
                            </p>
                        </article>

                        {/* 3. Conversion CTA (Programmatic CRO) */}
                        <div className="glass-morphism p-8 lg:p-12 relative overflow-hidden group border-brand-primary/20">
                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-2xl lg:text-3xl font-black italic tracking-tight uppercase leading-none">
                                        Scan <span className="text-brand-primary">{term}</span> <br />With Neural AI
                                    </h3>
                                    <p className="text-sm text-foreground/40 font-bold uppercase tracking-widest max-w-xs">
                                        Stop guessing. Let our AI verify this pattern for you in seconds.
                                    </p>
                                </div>
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:gap-5 transition-all shadow-xl shadow-brand-primary/30"
                                >
                                    Try AI Scanner
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Decorative Elements */}
                            <Sparkles className="absolute -top-4 -right-4 w-32 h-32 text-brand-primary/5 group-hover:rotate-12 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
