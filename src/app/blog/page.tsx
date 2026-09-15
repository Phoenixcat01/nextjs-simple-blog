import { getAllPosts } from "@/lib/post-utils";
import PostCard from "@/components/post-card";
 
export default function BlogPage() {
  const posts = getAllPosts();
 
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Semua Artikel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            date={post.date}
            description={post.description}
          />
        ))}
      </div>
    </div>
  );
}