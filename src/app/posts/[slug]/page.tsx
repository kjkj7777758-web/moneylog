import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { CATEGORIES } from '@/lib/constants';
import ReadingProgress from '@/components/blog/ReadingProgress';
import Breadcrumb from '@/components/blog/Breadcrumb';
import PostNav from '@/components/blog/PostNav';
import AdInContent from '@/components/ads/AdInContent';
import CoupangBanner from '@/components/ads/CoupangBanner';
import InfoBox from '@/components/mdx/InfoBox';
import WarningBox from '@/components/mdx/WarningBox';

function Table({ children, ...props }: React.ComponentProps<'table'>) {
  const childArray = React.Children.toArray(children);
  const hasTableSections = childArray.some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === 'thead' || child.type === 'tbody' || child.type === 'tfoot')
  );
  if (hasTableSections) {
    return <table {...props}>{children}</table>;
  }
  return <table {...props}><tbody>{children}</tbody></table>;
}

const mdxComponents = {
  InfoBox,
  WarningBox,
  table: Table,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image }],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const category = CATEGORIES[post.category];

  return (
    <>
      <ReadingProgress />

      <Breadcrumb
        items={[
          { label: '홈', href: '/' },
          { label: category.name, href: `/category/${post.category}` },
          { label: post.title },
        ]}
      />

      {/* Post Header */}
      <div className="py-10 pb-5 text-center max-w-[1200px] mx-auto px-5">
        <span className="inline-block text-[0.78rem] font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-full mb-4">
          {post.categoryLabel}
        </span>
        <h1 className="text-[2rem] font-bold max-w-[800px] mx-auto mb-4">{post.title}</h1>
        <div className="flex items-center justify-center gap-5 text-text-light text-[0.9rem]">
          <span>📅 {post.date.replace(/-/g, '.')}</span>
          <span>⏱ {post.readTime}분 읽기</span>
          <span>✍️ {post.author}</span>
        </div>
      </div>

      {/* Post Content */}
      <article className="post-content max-w-[800px] mx-auto px-5 pb-15">
        {/* Thumbnail */}
        <div className="w-full h-[300px] rounded-xl overflow-hidden mb-8 relative">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover rounded-xl"
            sizes="800px"
            priority
          />
        </div>

        {/* MDX Content */}
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeSlug],
            },
          }}
        />

        {/* Coupang Banner */}
        <CoupangBanner />

        {/* In-content Ad */}
        <AdInContent />
      </article>

      {/* Post Navigation */}
      <div className="max-w-[800px] mx-auto px-5 pb-10">
        <PostNav prevPost={post.prevPost} nextPost={post.nextPost} />
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: `https://money-log.company${post.image}`,
            datePublished: post.date,
            author: {
              '@type': 'Organization',
              name: '머니로그',
            },
            publisher: {
              '@type': 'Organization',
              name: '머니로그',
            },
          }).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
