import type { Metadata } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import CoupangBanner from '@/components/ads/CoupangBanner';
import CompoundCalculator from './CompoundCalculator';

export const metadata: Metadata = {
  title: '복리 계산기 2026 - 투자 수익 시뮬레이션',
  description: '복리 계산기로 장기 투자 수익을 시뮬레이션해보세요. 초기 투자금과 월 적립금으로 10년, 20년 후 자산을 예측합니다. 단리 vs 복리 비교.',
  keywords: [
    '복리 계산기',
    '복리계산기',
    '복리 이자 계산기',
    '투자 수익 계산기',
    '적립식 투자 계산기',
    '복리 효과',
    '72법칙',
    '장기투자 시뮬레이션',
    '자산 계산기',
  ],
  openGraph: {
    title: '복리 계산기 - 투자 수익 시뮬레이션 | 머니로그',
    description: '복리의 마법을 직접 확인하세요. 장기 투자 수익을 시뮬레이션합니다.',
    url: 'https://money-log.company/tools/compound-calculator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://money-log.company/tools/compound-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '복리 계산기',
  description: '복리 투자 수익을 계산합니다. 초기 투자금과 월 적립금으로 미래 자산을 예측합니다.',
  url: 'https://money-log.company/tools/compound-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  creator: {
    '@type': 'Organization',
    name: '머니로그',
    url: 'https://money-log.company',
  },
};

export default function CompoundCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <MainLayout>
        {/* SEO 정적 콘텐츠 */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-main mb-3">
            복리 계산기 <span className="text-accent">— 복리의 마법을 직접 확인하세요</span>
          </h1>
          <p className="text-text-light leading-relaxed">
            <strong>복리 계산기</strong>로 장기 투자 수익을 시뮬레이션해보세요.
            매월 소액이라도 꾸준히 투자하면 복리의 힘으로 큰 자산을 만들 수 있습니다.
            단리와 복리의 차이를 직접 비교해보세요.
          </p>
        </div>

        {/* 계산기 */}
        <CompoundCalculator />

        {/* SEO 보조 콘텐츠 */}
        <section className="mt-12 bg-bg-gray rounded-2xl p-6 md:p-8 border border-border">
          <h2 className="text-xl font-bold text-text-main mb-4">복리란 무엇인가요?</h2>
          <p className="text-text-light leading-relaxed mb-4">
            복리(Compound Interest)란 원금뿐만 아니라 이자에도 이자가 붙는 방식입니다.
            단리는 원금에만 이자가 붙지만, 복리는 이자가 다시 원금에 합산되어
            시간이 지날수록 기하급수적으로 자산이 늘어납니다.
          </p>

          <h3 className="text-lg font-bold text-text-main mb-3">72법칙이란?</h3>
          <p className="text-text-light leading-relaxed mb-4">
            72법칙은 투자금이 2배가 되는 데 걸리는 기간을 쉽게 계산하는 방법입니다.
            72를 연 수익률로 나누면 원금이 2배가 되는 기간(년)을 알 수 있습니다.
            예를 들어 연 7% 수익률이면 72÷7 = 약 10.3년 만에 원금이 2배가 됩니다.
          </p>

          <h3 className="text-lg font-bold text-text-main mb-3">복리 투자 예시</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-text-main">조건</th>
                  <th className="text-right py-3 px-4 font-semibold text-text-main">10년 후</th>
                  <th className="text-right py-3 px-4 font-semibold text-text-main">20년 후</th>
                  <th className="text-right py-3 px-4 font-semibold text-text-main">30년 후</th>
                </tr>
              </thead>
              <tbody className="text-text-light">
                <tr className="border-b border-border">
                  <td className="py-3 px-4">월 30만원, 연 5%</td>
                  <td className="py-3 px-4 text-right">약 4,658만원</td>
                  <td className="py-3 px-4 text-right">약 1.23억원</td>
                  <td className="py-3 px-4 text-right">약 2.50억원</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">월 50만원, 연 7%</td>
                  <td className="py-3 px-4 text-right">약 8,654만원</td>
                  <td className="py-3 px-4 text-right">약 2.60억원</td>
                  <td className="py-3 px-4 text-right">약 6.10억원</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">월 100만원, 연 10%</td>
                  <td className="py-3 px-4 text-right">약 2.05억원</td>
                  <td className="py-3 px-4 text-right">약 7.59억원</td>
                  <td className="py-3 px-4 text-right">약 22.6억원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 관련 링크 */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/posts/compound-interest" className="inline-flex items-center gap-1 bg-primary-light text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all no-underline">
            📖 복리의 마법: 작은 저축이 큰 자산이 되는 원리
          </Link>
          <Link href="/posts/etf-guide" className="inline-flex items-center gap-1 bg-primary-light text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all no-underline">
            📖 ETF 투자 시작하기
          </Link>
          <Link href="/tools/savings-calculator" className="inline-flex items-center gap-1 bg-primary-light text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all no-underline">
            🏦 적금 이자 계산기
          </Link>
        </div>

        <div className="mt-10">
          <CoupangBanner />
        </div>
      </MainLayout>
    </>
  );
}
