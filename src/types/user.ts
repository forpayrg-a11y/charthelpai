export type UserPlan = "free" | "pro";

export interface UserProfile {
    id: string;
    clerkId: string;
    email: string;
    name: string;
    image?: string;
    plan: UserPlan;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    createdAt: string;
    updatedAt: string;
}
