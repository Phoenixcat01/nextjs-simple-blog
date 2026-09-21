// src/lib/post-utils.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
 
// Menentukan path ke direktori 'posts'
const postsDirectory = path.join(process.cwd(), "posts");
 
export function getAllPosts() {
  // Membaca semua nama file di dalam direktori 'posts'
  const fileNames = fs.readdirSync(postsDirectory);
 
  const allPostsData = fileNames.map((fileName) => {
    // Membuat slug dari nama file (menghapus ekstensi .mdx)
    const slug = fileName.replace(/\.mdx$/, "");
 
    // Membaca konten file sebagai string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
 
    // Menggunakan gray-matter untuk mem-parsing frontmatter
    const matterResult = matter(fileContents);
 
    // Menggabungkan data frontmatter dengan slug
    return {
      slug,
      ...(matterResult.data as { title: string; date: string; description: string }),
    };
  });
 
  // Mengurutkan post berdasarkan tanggal (terbaru di atas)
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
 
  // Menggunakan gray-matter untuk memisahkan frontmatter dan konten
  const { data, content } = matter(fileContents);
 
  return {
    slug,
    frontmatter: data as { title: string; date: string; description: string },
    content,
  };
}