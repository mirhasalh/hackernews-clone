import { Post } from "@/types";

interface PostsProps {
    posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
    return (
        <table>
            <tbody>
                {posts.map((post, i) => (
                    <tr key={post.id}>
                        <td>{i + 1}.</td>
                        <td><button>Upvote</button></td>
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
