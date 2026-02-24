"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/store";

export const useSyncUser = () => {
    const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
    const { setUser, setLoading } = useUserStore();

    useEffect(() => {
        const sync = async () => {
            if (!isUserLoaded || !clerkUser) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/user/sync", { method: "POST" });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error("Error syncing user:", error);
            } finally {
                setLoading(false);
            }
        };

        sync();
    }, [isUserLoaded, clerkUser, setUser, setLoading]);
};
