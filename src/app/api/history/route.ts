import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import Analysis from "@/models/Analysis";

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const history = await Analysis.find({ userId })
            .sort({ createdAt: -1 })
            .limit(20);

        return NextResponse.json(history);
    } catch (error: any) {
        console.error("Fetch History Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch history" },
            { status: 500 }
        );
    }
}
