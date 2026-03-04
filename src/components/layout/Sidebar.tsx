import Link from 'next/link';
import { CATEGORIES, TAGS } from '@/lib/constants';
import { getRecentPosts, getPostsByCategory } from '@/lib/posts';
import AdSidebar from '@/components/ads/AdSidebar';

export default function Sidebar() {
  const recentPosts = getRecentPosts(5);
  const categorySlugs = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>;

  return (
    <aside className="flex flex-col gap-6">
      {/* About Widget */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h3 className="text-base font-bold mb-4 pb-3 border-b-2 border-primary">머니로그 소개</h3>
        <p className="text-[0.9rem] text-text-light leading-relaxed">
          경제와 재테크 정보를 쉽고 정확하게 전달하는 블로그입니다. 저축, 투자, 부동산, 절약 팁까지 실생활에 도움되는 정보를 제공합니다.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-block text-[0.85rem] px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark no-underline"
        >
          더 알아보기
        </Link>
      </div>

      {/* Categories Widget */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h3 className="text-base font-bold mb-4 pb-3 border-b-2 border-primary">카테고리</h3>
        <ul>
          {categorySlugs.map((slug) => {
            const cat = CATEGORIES[slug];
            const count = getPostsByCategory(slug).length;
            return (
              <li key={slug} className="border-b border-border last:border-b-0">
                <Link
                  href={`/category/${slug}`}
                  className="flex justify-between items-center py-2.5 text-text-main text-[0.92rem] no-underline hover:text-primary"
                >
                  <span>{cat.icon} {cat.name}</span>
                  <span className="bg-bg-gray px-2 py-0.5 rounded-xl text-[0.8rem] text-text-lighter">{count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h3 className="text-base font-bold mb-4 pb-3 border-b-2 border-primary">최근 글</h3>
        <ul>
          {recentPosts.map((post) => (
            <li key={post.slug} className="py-3 border-b border-border last:border-b-0">
              <Link href={`/posts/${post.slug}`} className="text-text-main text-[0.9rem] font-medium block mb-1 no-underline hover:text-primary">
                {post.title}
              </Link>
              <span className="text-[0.8rem] text-text-lighter">
                {post.date.replace(/-/g, '.')}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Ad */}
      <AdSidebar />

      {/* Tags Widget */}
      <div className="bg-white border border-border rounded-xl p-6">
        <h3 className="text-base font-bold mb-4 pb-3 border-b-2 border-primary">인기 태그</h3>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1.5 bg-bg-gray text-text-light rounded-full text-[0.82rem] hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
