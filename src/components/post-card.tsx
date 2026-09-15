import Link from 'next/link';
 
type PostCardProps = {
  slug: string;
  title: string;
  date: string;
  description: string;
};
 
export default function PostCard({ slug, title, date, description }: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="border rounded-lg p-4 h-full transition-all hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          {new Date(date).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">{description}</p>
      </div>
    </Link>
  );
}