import { create } from 'zustand';
import { AnalysisResult } from '@/types';

interface AnalysisState {
    currentAnalysis: AnalysisResult | null;
    isAnalyzing: boolean;
    error: string | null;
    setAnalysis: (analysis: AnalysisResult | null) => void;
    setIsAnalyzing: (isAnalyzing: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
    currentAnalysis: null,
    isAnalyzing: false,
    error: null,
    setAnalysis: (analysis) => set({
        currentAnalysis: analysis,
        isAnalyzing: false,
        error: null
    }),
    setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
    setError: (error) => set({ error, isAnalyzing: false }),
    reset: () => set({ currentAnalysis: null, isAnalyzing: false, error: null }),
}));
