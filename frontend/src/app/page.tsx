import Posts from "@/lib/components/Posts";
import { Post } from "@/types";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`, { cache: "no-store" });
  const data = await res.json();
  const posts: Post[] = data.posts

  return (
    <main>
      <h1>Hacker News Clone</h1>
      <Posts posts={posts} />
    </main>
  );
}
