// src/app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from "@/lib/post-utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options } from "rehype-pretty-code";
 
// Opsi untuk rehype-pretty-code
const options: Options = {
  theme: "one-dark-pro", // Atau tema lain dari shiki, misal: 'github-dark'
  onVisitLine(node) {
    // Mencegah baris kosong tanpa `class` agar tidak error
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    // Memberi style pada baris yang di-highlight
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedChars(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    (node.properties.className as string[]).push("word-highlighted");
    // Memberi style pada kata yang di-highlight
    // node.properties.className = ["word-highlighted"];
  },
};

// Props yang diterima halaman ini adalah `params`, yang berisi `slug`
type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

// Fungsi ini memberitahu Next.js slug apa saja yang ada
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { frontmatter, content } = getPostBySlug(slug);

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-2">{frontmatter.title}</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
        Dipublikasikan pada{" "}
        {new Date(frontmatter.date).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, options]],
          },
        }}
      />
    </article>
  );
}