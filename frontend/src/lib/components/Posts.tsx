"use client"

import { Post } from "@/types";
import axios from "axios";

interface PostsProps {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
    const onPost = async (id: number) => {
        const data = JSON.stringify({ id })
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upvote`, data)
    }
    return (
        <table>
            <tbody>
                {posts.map((post, i) => (
                    <tr key={post.id}>
                        <td>{i + 1}.</td>
                        <td><button onClick={() => onPost(post.id)}>Upvote</button></td>
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
