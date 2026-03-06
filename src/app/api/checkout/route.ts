import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

const getAppUrl = () => {
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
};

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { priceId } = await req.json();

        if (!priceId) {
            return new NextResponse("Price ID is required", { status: 400 });
        }

        const clerkUser = await currentUser();
        if (!clerkUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        await connectToDatabase();

        let user = await User.findOne({ clerkId: userId });
        const userEmail = clerkUser.emailAddresses[0].emailAddress;

        if (!user) {
            // Check if user exists by email if clerkId lookup fails
            user = await User.findOne({ email: userEmail });

            if (user) {
                // Update clerkId if we found the user by email
                user.clerkId = userId;
                user.name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || user.name;
                user.image = clerkUser.imageUrl || user.image;
                await user.save();
            } else {
                // Create new user if no match found
                user = await User.create({
                    clerkId: userId,
                    email: userEmail,
                    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "Anonymous",
                    image: clerkUser.imageUrl,
                });
            }
        }

        // 1. If user doesn't have a stripe customer id, create one
        if (!user.stripeCustomerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: {
                    clerkId: userId,
                },
            });
            user.stripeCustomerId = customer.id;
            await user.save();
        }

        // 2. Create the checkout session
        const session = await stripe.checkout.sessions.create({
            customer: user.stripeCustomerId,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${getAppUrl()}/?success=true`,
            cancel_url: `${getAppUrl()}/?canceled=true`,
            metadata: {
                clerkId: userId,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("[STRIPE_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
