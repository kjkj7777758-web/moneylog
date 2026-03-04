import Link from 'next/link';

interface PostNavProps {
  prevPost?: { slug: string; title: string };
  nextPost?: { slug: string; title: string };
}

export default function PostNav({ prevPost, nextPost }: PostNavProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 pt-10 border-t border-border">
      {prevPost ? (
        <Link
          href={`/posts/${prevPost.slug}`}
          className="block p-5 border border-border rounded-lg text-text-main no-underline hover:border-primary hover:shadow transition-all"
        >
          <div className="text-[0.82rem] text-text-lighter mb-1">← 이전 글</div>
          <div className="font-semibold text-[0.95rem]">{prevPost.title}</div>
        </Link>
      ) : <div />}
      {nextPost ? (
        <Link
          href={`/posts/${nextPost.slug}`}
          className="block p-5 border border-border rounded-lg text-text-main no-underline hover:border-primary hover:shadow transition-all text-right"
        >
          <div className="text-[0.82rem] text-text-lighter mb-1">다음 글 →</div>
          <div className="font-semibold text-[0.95rem]">{nextPost.title}</div>
        </Link>
      ) : <div />}
    </div>
  );
}
