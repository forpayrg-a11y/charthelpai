export type Sentiment = "bullish" | "bearish" | "neutral";
export type Volatility = "Low" | "Medium" | "High";
export type TrendAlignment = "Weak" | "Neutral" | "Strong";

export interface AnalysisLevels {
    entry: string;
    sl: string;
    tp: string[];
}

export interface HarmonicData {
    pattern: string;
    completion: number;
    potential: "reversal" | "continuation";
}

export interface AnalysisResult {
    asset: string;
    timeframe: string;
    sentiment: Sentiment;
    confidence: number;
    patterns: string[];
    levels: AnalysisLevels;
    harmonicData?: HarmonicData;
    description: string;
    volatility: Volatility;
    trendAlignment: TrendAlignment;
    riskScore: string;
}

export interface AnalysisRecord extends AnalysisResult {
    id: string;
    userId: string;
    imageKey?: string;
    createdAt: string;
}
