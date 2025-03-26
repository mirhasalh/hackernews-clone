import { NextResponse } from "next/server";

export async function middleware() {
    console.log('Middleware running');
    NextResponse.next()
}

export const config = {
    matcher: ["/"]
}