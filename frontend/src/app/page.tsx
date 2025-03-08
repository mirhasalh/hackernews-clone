import { Post } from "../types";

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:8080/posts", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  console.log('Res:', data)
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
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={post.url || "#"}>
                {post.title}
              </a>{" "}
              - <span>Score: {post.score}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
