import Link from 'next/link';
 
export default function Navbar() {
  return (
    <nav className="w-full p-4 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MyDevBlog
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-zinc-600 dark:hover:text-zinc-300">
            Home
          </Link>
          <Link href="/blog" className="hover:text-zinc-600 dark:hover:text-zinc-300">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
