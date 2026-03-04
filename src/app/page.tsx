import MainLayout from '@/components/layout/MainLayout';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PostsGrid from '@/components/blog/PostsGrid';
import CategoryTabs from '@/components/blog/CategoryTabs';
import AdBanner from '@/components/ads/AdBanner';
import { getAllPosts, getFeaturedPost } from '@/lib/posts';

export default function Home() {
  const allPosts = getAllPosts();
  const featured = getFeaturedPost();
  const latestPosts = allPosts.filter((p) => p.slug !== featured.slug).slice(0, 12);
  const morePosts = allPosts.filter(
    (p) => p.slug !== featured.slug && (p.category === 'saving-tips' || p.category === 'realestate')
  ).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#7c3aed] text-white py-15 text-center">
        <div className="max-w-[1200px] mx-auto px-5">
          <h1 className="text-white text-[2.2rem] font-bold mb-4">똑똑한 경제생활, 머니로그와 함께</h1>
          <p className="text-[1.1rem] opacity-90 max-w-[600px] mx-auto mb-6">
            저축부터 투자, 부동산, 절약 팁까지 실생활에 도움되는 경제 정보를 전해드립니다.
          </p>
          <div className="max-w-[500px] mx-auto relative">
            <input
              type="text"
              placeholder="궁금한 경제 정보를 검색하세요..."
              className="w-full py-3.5 pl-5 pr-14 border-none rounded-full text-base outline-none shadow-lg text-text-main"
              aria-label="검색"
              readOnly
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary text-white border-none w-10 h-10 rounded-full cursor-pointer text-[1.1rem] hover:bg-primary-dark">
              🔍
            </button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <CategoryTabs />

      {/* Main Content */}
      <MainLayout>
        <div>
          {/* Featured Post */}
          <FeaturedPost post={featured} />

          {/* Latest Posts */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[1.5rem] font-bold flex items-center gap-2">📝 최신 글</h2>
          </div>
          <PostsGrid posts={latestPosts} />

          {/* More Posts */}
          {morePosts.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-6 mt-12">
                <h2 className="text-[1.5rem] font-bold flex items-center gap-2">📌 절약 & 부동산</h2>
              </div>
              <PostsGrid posts={morePosts} />
            </>
          )}

          {/* Ad */}
          <div className="mt-10">
            <AdBanner />
          </div>
        </div>
      </MainLayout>
    </>
  );
}
