import { NextRequest, NextResponse } from "next/server";
import { analyzeChartImage } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import Analysis from "@/models/Analysis";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await analyzeChartImage(buffer, file.type);

        // Save to database if user is logged in
        if (userId) {
            try {
                await connectToDatabase();
                await Analysis.create({
                    userId,
                    asset: result.asset,
                    timeframe: result.timeframe,
                    sentiment: result.sentiment,
                    confidence: result.confidence,
                    patterns: result.patterns,
                    levels: result.levels,
                    description: result.description,
                });
            } catch (dbError) {
                console.error("Failed to save analysis:", dbError);
                // We still return the result even if saving fails
            }
        }

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("AI Analysis Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze chart: " + (error.message || "Unknown error") },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ message: "Analysis endpoint active. Use POST to analyze images." });
}
