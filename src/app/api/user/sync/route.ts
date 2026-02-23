import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function POST() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const clerkUser = await currentUser();
        if (!clerkUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        await connectToDatabase();

        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            user = await User.create({
                clerkId: userId,
                email: clerkUser.emailAddresses[0].emailAddress,
                name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Anonymous",
                image: clerkUser.imageUrl,
                plan: "free",
            });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("[USER_SYNC]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
