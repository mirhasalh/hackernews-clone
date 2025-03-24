export async function GET() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`, { cache: "no-store" });
    return res
}