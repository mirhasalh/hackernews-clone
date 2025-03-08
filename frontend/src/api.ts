export async function login(username: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Login failed");
    }

    return await res.json();
}
