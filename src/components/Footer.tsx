export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full p-4 text-center border-t border-zinc-200 dark:border-zinc-800">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        © {currentYear} MyDevBlog. Dibuat dengan Next.js.
      </p>
    </footer>
  );
}
