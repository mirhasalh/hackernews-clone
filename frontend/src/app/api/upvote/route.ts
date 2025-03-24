import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookies = req.cookies.get('session');

    if (!cookies) {
        return NextResponse.redirect(new URL("/auth", req.nextUrl));
    }

    try {
        const body = await req.json();
        const { id } = body;

        console.log("ID:", id);

        return NextResponse.json({ message: `Received ID: ${id}` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
}