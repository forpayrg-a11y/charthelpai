import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json({ message: "Upload endpoint ready" });
}

export async function GET() {
    return NextResponse.json({ message: "Endpoint active" });
}
