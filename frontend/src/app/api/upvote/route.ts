import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies()
    const hasSession = cookieStore.has('session')

    if (!hasSession) {
        return NextResponse.json({ message: "Unauthorized", redirect: "/auth" }, { status: 200 });
    }

    try {
        const body = await req.json();
        const { id } = body;

        // TODO: Integrate with upvote API

        return NextResponse.json({ message: `Received ID: ${id}` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }
}