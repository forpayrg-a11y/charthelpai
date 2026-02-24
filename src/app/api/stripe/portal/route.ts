import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const user = await User.findOne({ clerkId: userId });

        if (!user || !user.stripeCustomerId) {
            return NextResponse.json({ error: "Customer not found" }, { status: 404 });
        }

        // Create a Stripe Customer Portal session
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
        });

        return NextResponse.json({ url: portalSession.url });
    } catch (error: any) {
        console.error("Stripe Portal Error:", error);
        return NextResponse.json({ error: "Failed to create portal session" }, { status: 500 });
    }
}
