import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
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

        return NextResponse.json(user);
    } catch (error) {
        console.error("[USER_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

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

        const userEmail = clerkUser.emailAddresses[0].emailAddress;

        if (!user) {
            // Check if user exists with the same email but different clerkId
            user = await User.findOne({ email: userEmail });

            if (user) {
                // Update existing user with new clerkId
                user.clerkId = userId;
                user.name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || user.name;
                user.image = clerkUser.imageUrl || user.image;
                await user.save();
            } else {
                // Create new user if not found by either clerkId or email
                user = await User.create({
                    clerkId: userId,
                    email: userEmail,
                    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Anonymous",
                    image: clerkUser.imageUrl,
                    plan: "free",
                });
            }
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("[USER_SYNC]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
