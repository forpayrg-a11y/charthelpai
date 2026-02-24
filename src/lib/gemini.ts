import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_CHART_PROMPT, buildUserPrompt } from "@/components/prompts";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const visionModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: SYSTEM_CHART_PROMPT
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
  return JSON.parse(jsonMatch ? jsonMatch[0] : text);
}
