"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{ user: string | null }>({ user: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.username);
                }
            } catch (error) {
                setUser(null);
            }
        }

        checkAuth();
    }, []);

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;
