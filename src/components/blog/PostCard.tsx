import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white border border-border rounded-xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 group">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="w-full h-[200px] bg-bg-gray relative overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-5">
        <span className="inline-block text-[0.78rem] font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-full mb-2.5">
          {post.categoryLabel}
        </span>
        <h3 className="text-[1.1rem] font-bold mb-2 leading-snug line-clamp-2">
          <Link href={`/posts/${post.slug}`} className="text-text-main no-underline hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="text-[0.9rem] text-text-light leading-relaxed line-clamp-3 mb-4">
          {post.description}
        </p>
        <div className="flex items-center gap-3 text-[0.82rem] text-text-lighter">
          <span>📅 {post.date.replace(/-/g, '.')}</span>
          <span>⏱ {post.readTime}분 읽기</span>
        </div>
      </div>
    </article>
  );
}
