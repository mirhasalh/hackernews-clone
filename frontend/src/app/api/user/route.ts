import axios from "axios"
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
        const user = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${session}`,
            },
        })
        
        return NextResponse.json({ user: user }, { status: 200 })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Failed to fetch user data:", error.response?.data || error.message);
        } else {
            console.error("Failed to fetch user data:", error);
        }

        const status = axios.isAxiosError(error) ? error.response?.status : 500;
        return NextResponse.json(
            { user: null, error: "Failed to fetch user data" },
            { status: status }
        );
    }
}