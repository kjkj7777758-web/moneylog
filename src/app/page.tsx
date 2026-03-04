import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PostsGrid from '@/components/blog/PostsGrid';
import CategoryTabs from '@/components/blog/CategoryTabs';
import AdBanner from '@/components/ads/AdBanner';
import CoupangBanner from '@/components/ads/CoupangBanner';
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
      <section className="relative overflow-hidden min-h-[420px] flex items-center justify-center">
        {/* Background Image */}
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-200 text-sm font-medium tracking-wide">경제 · 재테크 · 투자 정보</span>
          </div>

          <h1 className="text-white text-[2.6rem] md:text-[3.2rem] font-extrabold mb-5 leading-tight tracking-tight drop-shadow-lg">
            똑똑한 경제생활,<br />
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">머니로그</span>와 함께
          </h1>
          <p className="text-gray-300 text-[1.05rem] md:text-[1.15rem] max-w-[550px] mx-auto mb-8 leading-relaxed">
            저축부터 투자, 부동산, 절약 팁까지<br className="hidden md:block" />
            실생활에 도움되는 경제 정보를 전해드립니다.
          </p>

          {/* Search Bar - Glass Effect */}
          <div className="max-w-[500px] mx-auto relative">
            <input
              type="text"
              placeholder="궁금한 경제 정보를 검색하세요..."
              className="w-full py-4 pl-6 pr-14 border border-white/20 rounded-full text-base outline-none shadow-2xl text-white bg-white/10 backdrop-blur-md placeholder:text-gray-400 focus:border-amber-400/50 focus:bg-white/15 transition-all"
              aria-label="검색"
              readOnly
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 border-none w-11 h-11 rounded-full cursor-pointer text-[1.1rem] font-bold hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg">
              🔍
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-12 mt-10">
            <div className="text-center">
              <div className="text-amber-400 text-2xl md:text-3xl font-bold">15+</div>
              <div className="text-gray-400 text-xs md:text-sm mt-1">전문 콘텐츠</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-amber-400 text-2xl md:text-3xl font-bold">5</div>
              <div className="text-gray-400 text-xs md:text-sm mt-1">전문 카테고리</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-amber-400 text-2xl md:text-3xl font-bold">매일</div>
              <div className="text-gray-400 text-xs md:text-sm mt-1">업데이트</div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
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

          {/* Coupang Banner */}
          <div className="mt-10">
            <CoupangBanner />
          </div>

          {/* Ad */}
          <div className="mt-6">
            <AdBanner />
          </div>
        </div>
      </MainLayout>
    </>
  );
}
