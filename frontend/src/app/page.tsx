"use client"

import Posts from "@/lib/components/Posts";
import { Post, User } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<User>({ id: -1, username: "" });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts)
      })

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`)
      .then((res) => res.json())
      .then((data) => setUser(data.user))
  }, [])

  return (
    <main>
      {user && user.username !== "" ? (
        <span>{user!.username}</span>
      ) : (
        <a href="/auth">Register/Login</a>
      )
      }
      <h1>Hacker News Clone</h1>
      <Posts posts={posts} />
    </main>
  );
}
