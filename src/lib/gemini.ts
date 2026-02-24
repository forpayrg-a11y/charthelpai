import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export const visionModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
}

export async function analyzeChartImage(imageBuffer: Buffer, mimeType: string): Promise<AnalysisResult> {
  const prompt = `
    Analyze this trading chart image. Provide a JSON response with the following structure:
    {
      "asset": "Asset name (e.g. BTC/USDT)",
      "timeframe": "Timeframe (e.g. 1H, 4H, Daily)",
      "sentiment": "bullish" | "bearish" | "neutral",
      "confidence": number (0-100),
      "patterns": ["pattern1", "pattern2"],
      "levels": {
        "entry": "suggested entry price",
        "sl": "suggested stop loss",
        "tp": ["tp1", "tp2"]
      },
      "harmonicData": {
        "pattern": "Gartley | Bat | Butterfly | Cypher (if detected)",
        "completion": "Completion percentage (0-100)",
        "potential": "reversal" | "continuation"
      },
      "description": "Short summary of findings including harmonic insights if applicable"
    }
    Only return the raw JSON.
  `;

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
