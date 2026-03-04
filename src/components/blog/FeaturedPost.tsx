import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-border rounded-xl overflow-hidden mb-10 hover:shadow-lg transition-all group">
      <Link href={`/posts/${post.slug}`} className="block relative min-h-[280px] bg-bg-gray overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </Link>
      <div className="p-8 flex flex-col justify-center">
        <span className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-accent mb-2">
          ⭐ 추천 글
        </span>
        <span className="inline-block text-[0.78rem] font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-full mb-2.5 self-start">
          {post.categoryLabel}
        </span>
        <h2 className="text-[1.4rem] font-bold mb-2 leading-snug">
          <Link href={`/posts/${post.slug}`} className="text-text-main no-underline hover:text-primary">
            {post.title}
          </Link>
        </h2>
        <p className="text-[0.9rem] text-text-light leading-relaxed line-clamp-3 mb-4">
          {post.description}
        </p>
        <div className="flex items-center gap-3 text-[0.82rem] text-text-lighter">
          <span>📅 {post.date.replace(/-/g, '.')}</span>
          <span>⏱ {post.readTime}분 읽기</span>
        </div>
      </div>
    </div>
  );
}
