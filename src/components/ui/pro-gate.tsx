import React from "react";
import { Lock, Sparkles } from "lucide-react";
import { useUIStore } from "@/store";

interface ProGateProps {
    children: React.ReactNode;
    isPro?: boolean;
    featureName?: string;
}

export const ProGate = ({ children, isPro = false, featureName = "Advanced Analysis" }: ProGateProps) => {
    const { setPricingModalOpen } = useUIStore();

    if (isPro) return <>{children}</>;

    const handleUpgradeClick = () => {
        setPricingModalOpen(true);
    };

    return (
        <div className="relative group">
            <div className="filter blur-md grayscale pointer-events-none opacity-40">
                {children}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/20 backdrop-blur-[2px] rounded-3xl z-10">
                <div className="p-3 rounded-2xl bg-brand-primary/20 text-brand-primary mb-4">
                    <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-black text-lg tracking-tight mb-2">PRO Feature</h4>
                <p className="text-xs text-foreground/60 mb-6 max-w-[200px]">
                    Upgrade to PRO to unlock {featureName} and detailed harmonic patterns.
                </p>
                <button
                    onClick={handleUpgradeClick}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-primary text-white text-[10px] font-black h-12 px-8 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/20"
                >
                    <Sparkles className="w-3 h-3" />
                    UPGRADE TO PRO
                </button>
            </div>
        </div>
    );
};
