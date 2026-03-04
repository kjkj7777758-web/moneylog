import type { Metadata } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import CoupangBanner from '@/components/ads/CoupangBanner';
import SalaryCalculator from './SalaryCalculator';

export const metadata: Metadata = {
  title: '연봉 실수령액 계산기 2026 - 4대보험 소득세 자동 계산',
  description: '2026년 최신 세율 기준 연봉 실수령액 계산기. 국민연금, 건강보험, 고용보험, 소득세, 지방소득세를 자동으로 계산하여 월 실수령액을 확인하세요.',
  keywords: [
    '연봉 실수령액 계산기',
    '연봉계산기',
    '실수령액 계산',
    '4대보험 계산기',
    '소득세 계산기',
    '2026 연봉 실수령액',
    '월급 실수령액',
    '연봉 세후',
    '급여 계산기',
  ],
  openGraph: {
    title: '연봉 실수령액 계산기 2026 - 머니로그',
    description: '2026년 최신 기준으로 연봉 실수령액을 계산해보세요. 4대보험, 소득세 자동 계산.',
    url: 'https://money-log.company/tools/salary-calculator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://money-log.company/tools/salary-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '연봉 실수령액 계산기',
  description: '2026년 최신 세율 기준 연봉 실수령액 계산기. 4대보험, 소득세, 지방소득세를 자동으로 계산합니다.',
  url: 'https://money-log.company/tools/salary-calculator',
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

export default function SalaryCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <MainLayout>
        {/* SEO 정적 콘텐츠 - 검색엔진 크롤링용 */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-main mb-3">
            연봉 실수령액 계산기 <span className="text-primary">2026</span>
          </h1>
          <p className="text-text-light leading-relaxed">
            2026년 최신 세율을 기준으로 연봉 실수령액을 정확하게 계산해보세요.
            국민연금, 건강보험, 장기요양보험, 고용보험 등 <strong>4대 보험료</strong>와
            <strong>소득세</strong>, <strong>지방소득세</strong>를 자동으로 계산하여
            매월 실제로 받는 월급을 확인할 수 있습니다.
          </p>
        </div>

        {/* 계산기 컴포넌트 */}
        <SalaryCalculator />

        {/* SEO 보조 콘텐츠 */}
        <section className="mt-12 bg-bg-gray rounded-2xl p-6 md:p-8 border border-border">
          <h2 className="text-xl font-bold text-text-main mb-4">연봉 실수령액이란?</h2>
          <p className="text-text-light leading-relaxed mb-4">
            연봉 실수령액이란 세전 연봉에서 4대 보험(국민연금, 건강보험, 장기요양보험, 고용보험)과
            소득세, 지방소득세를 공제한 후 실제로 받는 금액입니다.
            같은 연봉이라도 부양가족 수와 비과세 항목에 따라 실수령액이 달라질 수 있습니다.
          </p>

          <h3 className="text-lg font-bold text-text-main mb-3">2026년 4대 보험 요율</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-text-main">항목</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-main">근로자 부담률</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-main">비고</th>
                </tr>
              </thead>
              <tbody className="text-text-light">
                <tr className="border-b border-border">
                  <td className="py-3 px-4">국민연금</td>
                  <td className="py-3 px-4">4.5%</td>
                  <td className="py-3 px-4">기준소득월액 상한 590만원</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">건강보험</td>
                  <td className="py-3 px-4">3.545%</td>
                  <td className="py-3 px-4">사업자와 반반 부담</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">장기요양보험</td>
                  <td className="py-3 px-4">건강보험의 12.95%</td>
                  <td className="py-3 px-4">건강보험에 포함 징수</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">고용보험</td>
                  <td className="py-3 px-4">0.9%</td>
                  <td className="py-3 px-4">실업급여 기여금</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-text-main mt-6 mb-3">자주 묻는 질문</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-text-main">연봉 3000만원이면 실수령액은 얼마인가요?</p>
              <p className="text-text-light text-sm mt-1">연봉 3,000만원(세전)의 경우 4대보험과 소득세를 공제하면 월 약 220~225만원 정도를 실수령하게 됩니다. 정확한 금액은 위 계산기에서 확인하세요.</p>
            </div>
            <div>
              <p className="font-semibold text-text-main">연봉 5000만원이면 실수령액은 얼마인가요?</p>
              <p className="text-text-light text-sm mt-1">연봉 5,000만원의 경우 월 약 350~360만원 정도를 실수령합니다. 부양가족 수에 따라 달라질 수 있습니다.</p>
            </div>
            <div>
              <p className="font-semibold text-text-main">비과세 식대란 무엇인가요?</p>
              <p className="text-text-light text-sm mt-1">2023년부터 식대 비과세 한도가 월 20만원으로 상향되었습니다. 식대가 별도 지급되는 경우 과세 대상에서 제외되어 실수령액이 늘어납니다.</p>
            </div>
          </div>
        </section>

        {/* 관련 글 링크 */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/posts/interest-rate-impact" className="inline-flex items-center gap-1 bg-primary-light text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all no-underline">
            📖 금리가 월급에 미치는 영향
          </Link>
          <Link href="/tools/savings-calculator" className="inline-flex items-center gap-1 bg-primary-light text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all no-underline">
            🏦 적금 이자 계산기
          </Link>
          <Link href="/tools/compound-calculator" className="inline-flex items-center gap-1 bg-primary-light text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all no-underline">
            📈 복리 계산기
          </Link>
        </div>

        <div className="mt-10">
          <CoupangBanner />
        </div>
      </MainLayout>
    </>
  );
}
