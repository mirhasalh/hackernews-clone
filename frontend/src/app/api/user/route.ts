import { cookies } from 'next/headers'
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies()
    const hasSession = cookieStore.has('session')

    if (!hasSession) {
        return NextResponse.json({ user: null }, { status: 200 });
    }

    const session = cookieStore.get('session')

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session?.value}`,
            },
        })

        const data = await res.json()

        return NextResponse.json({ user: data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}