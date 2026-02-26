import { create } from 'zustand';

interface UIState {
    isSidebarOpen: boolean;
    isPricingModalOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setPricingModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isSidebarOpen: false,
    isPricingModalOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (open) => set({ isSidebarOpen: open }),
    setPricingModalOpen: (open) => set({ isPricingModalOpen: open }),
}));
