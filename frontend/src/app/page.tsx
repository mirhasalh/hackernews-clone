import axios from "axios"
import Posts from "@/lib/components/Posts";
import { Post } from "@/types";

export default async function Home() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`)
  const posts: Post[] = res.data.posts

  return (
    <main>
      <h1>Hacker News Clone</h1>
      <Posts posts={posts} />
    </main>
  );
}
