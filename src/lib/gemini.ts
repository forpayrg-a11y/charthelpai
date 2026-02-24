import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_TRADING_ANALYSIS_PROMPT, buildUserPrompt } from "@/components/prompts";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const visionModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: SYSTEM_TRADING_ANALYSIS_PROMPT
});

export interface AnalysisResult {
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
  harmonicData?: {
    pattern: string;
    completion: number;
    potential: "reversal" | "continuation";
  };
  description: string;
  volatility: "Low" | "Medium" | "High";
  trendAlignment: "Weak" | "Neutral" | "Strong";
  riskScore: string; // e.g., "A", "B+", "C"
}

export async function analyzeChartImage(imageBuffer: Buffer, mimeType: string): Promise<AnalysisResult> {
  const prompt = buildUserPrompt("Analyze this trading chart image.");

  const result = await visionModel.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType
      }
    }
  ]);

  const response = await result.response;
  const text = response.text();

  // Basic cleanup of response in case AI includes markdown blocks
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const rawJson = JSON.parse(jsonMatch ? jsonMatch[0] : text);

  // Map the new structured response back to our AnalysisResult interface
  return {
    asset: rawJson.metadata?.asset || "Unknown",
    timeframe: rawJson.metadata?.timeframe || "Unknown",
    sentiment: rawJson.analysis?.sentiment || "neutral",
    confidence: rawJson.analysis?.confidenceScore || 0,
    patterns: rawJson.technicalFactors?.identifiedPatterns || [],
    levels: {
      entry: rawJson.technicalFactors?.keyLevels?.supportZones?.[0] || "N/A",
      sl: "See Resistance", // Placeholder since new structure doesn't prioritize entry/sl as explicitly
      tp: rawJson.technicalFactors?.keyLevels?.resistanceZones || [],
    },
    harmonicData: rawJson.technicalFactors?.harmonicData ? {
      pattern: rawJson.technicalFactors.harmonicData.patternDetected,
      completion: rawJson.technicalFactors.harmonicData.completionRatio,
      potential: rawJson.technicalFactors.harmonicData.potentialOutcome as any,
    } : undefined,
    description: rawJson.summary?.technicalDescription || "",
    volatility: rawJson.analysis?.volatilityProfile || "Medium",
    trendAlignment: rawJson.analysis?.trendAlignment || "Neutral",
    riskScore: rawJson.summary?.riskProfile || "C",
  };
}
