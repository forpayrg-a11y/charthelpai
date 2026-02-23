import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    clerkId: string;
    email: string;
    name: string;
    image?: string;
    plan: "free" | "pro";
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        clerkId: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        image: { type: String },
        plan: { type: String, enum: ["free", "pro"], default: "free" },
        stripeCustomerId: { type: String },
        stripeSubscriptionId: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
