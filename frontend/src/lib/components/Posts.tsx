"use client"

import { useRouter } from 'next/navigation'
import { Post } from "@/types";

interface PostsProps {
    posts: Post[];
    onUpvoted: (id: number) => void;
}

export default function Posts({ posts, onUpvoted }: PostsProps) {
    const router = useRouter()

    const onUpvote = async (id: number) => {
        try {
            const body = JSON.stringify({ id })
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upvote`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body,
            })

            const data = await res.json()

            if (data.message === 'Unauthorized') router.push('/auth')

            if (data.message === 'Post upvoted') onUpvoted(id)
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <table>
            <tbody>
                {posts.map((post, i) => (
                    <tr key={post.id}>
                        <td>{i + 1}.</td>
                        <td><button onClick={() => onUpvote(post.id)}>Upvote</button></td>
                        <td>
                            <div>
                                <a href={post.url}>{post.title}</a><br />
                                <small>{post.score} Points</small>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
