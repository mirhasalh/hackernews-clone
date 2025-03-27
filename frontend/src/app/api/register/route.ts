import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json()
        const { username, password } = body

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json()

        if (res.status === 201 || res.status === 200) {
            const message = data.message
            const token = data.token;

            const cookieStore = await cookies()
            cookieStore.set("session", token, {
                httpOnly: true,
                path: "/",
                sameSite: "strict",
            });

            return NextResponse.json({ message: message, user: data.user }, { status: 201 });
        }

        const message = data.message
        return NextResponse.json({ message: message }, { status: res.status });
    } catch (error) {
        return NextResponse.json({ message: error })
    }
}