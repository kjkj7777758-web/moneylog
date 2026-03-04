import { Metadata } from 'next';
import { CATEGORIES } from '@/lib/constants';
import { CategorySlug } from '@/types';
import { getPostsByCategory } from '@/lib/posts';
import MainLayout from '@/components/layout/MainLayout';
import PostsGrid from '@/components/blog/PostsGrid';
import Breadcrumb from '@/components/blog/Breadcrumb';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES[slug as CategorySlug];
  if (!category) return {};
  return {
    title: `${category.icon} ${category.name}`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES[slug as CategorySlug];
  if (!category) return <div>카테고리를 찾을 수 없습니다.</div>;

  const posts = getPostsByCategory(slug as CategorySlug);

  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', href: '/' },
          { label: category.name },
        ]}
      />

      {/* Category Header */}
      <div className="bg-bg-gray py-10 text-center">
        <h1 className="text-[2rem] font-bold mb-2">
          {category.icon} {category.name}
        </h1>
        <p className="text-text-light">{category.description}</p>
      </div>

      <MainLayout>
        <div>
          <PostsGrid posts={posts} />
        </div>
      </MainLayout>
    </>
  );
}
