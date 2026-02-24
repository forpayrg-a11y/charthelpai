"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Hydration mismatch prevention
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="p-3 glass rounded-xl border border-border w-11 h-11" />;
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className={cn(
                "p-3 glass rounded-xl hover:bg-muted transition-colors border border-border cursor-pointer flex items-center justify-center relative w-11 h-11",
                className
            )}
            aria-label="Toggle theme"
        >
            {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground/70 transition-all animate-in zoom-in-50 duration-500" />
            ) : (
                <Moon className="h-5 w-5 text-foreground/70 transition-all animate-in zoom-in-50 duration-500" />
            )}
        </button>
    );
}
