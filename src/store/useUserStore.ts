import { create } from 'zustand';
import { UserProfile, UserPlan } from '@/types';

interface UserState {
    user: UserProfile | null;
    isPro: boolean;
    loading: boolean;
    error: string | null;
    setUser: (user: UserProfile | null) => void;
    setPlan: (plan: UserPlan) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isPro: false,
    loading: true,
    error: null,
    setUser: (user) => set({
        user,
        isPro: user?.plan === 'pro',
        loading: false
    }),
    setPlan: (plan) => set((state) => ({
        user: state.user ? { ...state.user, plan } : null,
        isPro: plan === 'pro'
    })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error, loading: false }),
}));
