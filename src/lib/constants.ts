import { Category, CategorySlug } from '@/types';

export const SITE_NAME = '머니로그';
export const SITE_TAGLINE = '똑똑한 경제생활 가이드';
export const SITE_URL = 'https://money-log.company';
export const SITE_DESCRIPTION = '경제와 재테크 정보를 쉽고 정확하게 전달하는 블로그. 저축, 투자, 부동산, 절약 팁, 경제 상식까지 한곳에서 만나보세요.';

export const CATEGORIES: Record<CategorySlug, Category> = {
  savings: {
    slug: 'savings',
    name: '저축·예금',
    icon: '💰',
    description: '안전하고 꾸준한 자산 형성을 위한 저축과 예금 정보를 제공합니다.',
  },
  investment: {
    slug: 'investment',
    name: '주식·투자',
    icon: '📈',
    description: '주식, ETF, 펀드 등 다양한 투자 상품 분석과 전략을 공유합니다.',
  },
  realestate: {
    slug: 'realestate',
    name: '부동산',
    icon: '🏠',
    description: '부동산 시장 동향과 내 집 마련 전략을 안내합니다.',
  },
  'saving-tips': {
    slug: 'saving-tips',
    name: '절약·생활경제',
    icon: '🧾',
    description: '일상 속 절약 팁과 현명한 소비 노하우를 공유합니다.',
  },
  economy: {
    slug: 'economy',
    name: '경제상식',
    icon: '📊',
    description: '금리, 환율, 인플레이션 등 경제 기본 개념을 쉽게 설명합니다.',
  },
};

export const NAV_LINKS = [
  { href: '/', label: '홈' },
  { href: '/category/savings', label: '저축' },
  { href: '/category/investment', label: '투자' },
  { href: '/category/realestate', label: '부동산' },
  { href: '/category/saving-tips', label: '절약' },
  { href: '/category/economy', label: '경제상식' },
];

export const TAGS = [
  '적금', 'ETF', '주식', '전세', '월세', '가계부',
  '복리', '인플레이션', '금리', '환율', '배당주', '청약', '절약', '세금',
];
