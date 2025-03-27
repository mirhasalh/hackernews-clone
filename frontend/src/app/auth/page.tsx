"use client";

import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
    const [message, setMessage] = useState<string | null>(null);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>, type: "register" | "login") => {
        event.preventDefault();
        const router = useRouter()

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        const path = type === 'register' ? '/api/register' : '/api/login'
        const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            console.log('Data:', data);
            setMessage(data.message || "Success!");

            if (res.ok) router.push('/')
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <main>
            <h1>Register</h1>
            <form onSubmit={(e) => onSubmit(e, "register")}>
                <label>
                    <span>Username</span>
                    <input type="text" name="username" placeholder="azuredragonfly" required />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" required />
                </label>
                <button type="submit">
                    <span>Register</span>
                </button>
            </form>

            <h1>Login</h1>
            <form onSubmit={(e) => onSubmit(e, "login")}>
                <label>
                    <span>Username</span>
                    <input type="text" name="username" placeholder="azuredragonfly" required />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" required />
                </label>
                <button type="submit">
                    <span>Login</span>
                </button>
            </form>

            {message && <p>{message}</p>}
        </main>
    );
}
