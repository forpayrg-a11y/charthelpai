import mongoose, { Schema, Document } from "mongoose";

export interface IAnalysis extends Document {
    userId: string;
    asset: string;
    timeframe: string;
    sentiment: "bullish" | "bearish" | "neutral";
    confidence: number;
    patterns: string[];
    levels: {
        entry: string;
        sl: string;
        tp: string[];
    };
    description: string;
    volatility?: string;
    trendAlignment?: string;
    riskScore?: string;
    imageKey?: string;
    createdAt: Date;
}

const AnalysisSchema: Schema = new Schema(
    {
        userId: { type: String, required: true, index: true },
        asset: { type: String, required: true },
        timeframe: { type: String, required: true },
        sentiment: { type: String, enum: ["bullish", "bearish", "neutral"], required: true },
        confidence: { type: Number, required: true },
        patterns: [{ type: String }],
        levels: {
            entry: { type: String },
            sl: { type: String },
            tp: [{ type: String }],
        },
        description: { type: String },
        volatility: { type: String },
        trendAlignment: { type: String },
        riskScore: { type: String },
        imageKey: { type: String },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Analysis || mongoose.model<IAnalysis>("Analysis", AnalysisSchema);
