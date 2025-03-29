import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies()
    const hasSession = cookieStore.has('session')

    if (!hasSession) {
        return NextResponse.json({ message: "Unauthorized", redirect: "/auth" }, { status: 200 });
    }

    const session = cookieStore.get('session')

    try {
        const body = await req.json();
        const { id } = body;

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}/upvote`
        console.log('URL:', url);
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.value}`,
            },
        });

        const data = await res.json()
        const message = data.message

        return NextResponse.json({ message: message }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}