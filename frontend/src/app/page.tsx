import { Post } from "../types";

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return data.posts;
}

export default async function Home() {
  let posts: Post[] = [];
  try {
    posts = await fetchPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <main>
      <h1>Hacker News Clone</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <table>
          <tbody>
            {posts.map((post, i) => (
              <tr>
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
      )}
    </main>
  );
}
