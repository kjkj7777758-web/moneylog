'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import SearchOverlay from '@/components/search/SearchOverlay';

const SEARCH_DATA = [
  { title: '2026년 고금리 적금 상품 비교 가이드', excerpt: '올해 가장 높은 금리를 제공하는 적금 상품들을 꼼꼼히 비교 분석합니다.', category: '저축', slug: 'savings-comparison-2026' },
  { title: '비상금 모으는 5가지 실전 방법', excerpt: '예상치 못한 지출에 대비하는 비상금 마련 전략을 소개합니다.', category: '저축', slug: 'emergency-fund-tips' },
  { title: '복리의 마법: 작은 저축이 큰 자산이 되는 원리', excerpt: '아인슈타인도 감탄한 복리 효과를 실제 수치와 함께 알아봅니다.', category: '저축', slug: 'compound-interest' },
  { title: '주식 투자 입문자를 위한 기초 가이드', excerpt: '주식 투자를 처음 시작하는 분들을 위한 단계별 안내서입니다.', category: '투자', slug: 'stock-basics' },
  { title: 'ETF 투자의 장점과 시작하는 방법', excerpt: 'ETF의 개념부터 실제 투자까지 초보자도 쉽게 따라할 수 있는 가이드입니다.', category: '투자', slug: 'etf-guide' },
  { title: '배당주 투자로 월급 외 수입 만들기', excerpt: '안정적인 배당 수익을 통해 매달 부수입을 만드는 전략을 알아봅니다.', category: '투자', slug: 'dividend-investing' },
  { title: '전세와 월세, 어떤 게 더 유리할까', excerpt: '전세와 월세의 장단점을 비교하고 나에게 맞는 선택을 돕습니다.', category: '부동산', slug: 'jeonse-vs-wolse' },
  { title: '청약통장 활용법 완벽 정리', excerpt: '주택청약종합저축의 가입부터 당첨까지 알아야 할 모든 것을 정리합니다.', category: '부동산', slug: 'housing-subscription' },
  { title: '부동산 투자 시 알아야 할 세금 총정리', excerpt: '부동산 취득부터 양도까지 발생하는 세금 종류와 절세 방법을 정리합니다.', category: '부동산', slug: 'realestate-tax' },
  { title: '가계부 작성법과 추천 앱 5선', excerpt: '올바른 가계부 작성법과 효과적인 지출 관리 앱을 추천합니다.', category: '절약', slug: 'budget-apps' },
  { title: '통신비 절약하는 현실적인 방법들', excerpt: '알뜰폰, 요금제 변경 등 통신비를 줄이는 실질적인 방법을 소개합니다.', category: '절약', slug: 'telecom-saving' },
  { title: '식비 절약 팁: 월 30만원으로 건강하게 먹기', excerpt: '한정된 예산 안에서 영양가 있는 식사를 하는 방법을 제안합니다.', category: '절약', slug: 'food-budget' },
  { title: '인플레이션이란? 내 자산을 지키는 방법', excerpt: '물가 상승의 원리와 인플레이션 시대에 자산을 보호하는 전략을 설명합니다.', category: '경제상식', slug: 'inflation-guide' },
  { title: '금리 인상이 우리 생활에 미치는 영향', excerpt: '기준금리 변동이 대출, 예금, 소비에 미치는 영향을 분석합니다.', category: '경제상식', slug: 'interest-rate-impact' },
  { title: '환율의 기초: 원달러 환율이 오르면 무슨 일이?', excerpt: '환율의 기본 개념과 환율 변동이 일상에 미치는 영향을 알아봅니다.', category: '경제상식', slug: 'exchange-rate-basics' },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = useCallback(() => setSearchOpen(true), []);
  const handleSearchClose = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <Header onSearchOpen={handleSearchOpen} />
      {children}
      <Footer />
      <BackToTop />
      <SearchOverlay
        isOpen={searchOpen}
        onClose={handleSearchClose}
        posts={SEARCH_DATA}
      />
    </>
  );
}
