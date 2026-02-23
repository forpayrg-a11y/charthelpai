import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();

        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Toggle plan for demo purposes
        user.plan = user.plan === "pro" ? "free" : "pro";
        await user.save();

        return NextResponse.json(user);
    } catch (error) {
        console.error("[USER_UPGRADE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
