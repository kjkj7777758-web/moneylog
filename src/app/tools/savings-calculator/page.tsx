import type { Metadata } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import CoupangBanner from '@/components/ads/CoupangBanner';
import SavingsCalculator from './SavingsCalculator';

export const metadata: Metadata = {
  title: '적금 이자 계산기 2026 - 예금 만기 수령액 계산',
  description: '2026년 최신 적금 이자 계산기. 정기적금, 정기예금 만기 수령액을 일반과세, 비과세, 세금우대별로 정확하게 계산합니다.',
  keywords: [
    '적금 이자 계산기',
    '적금계산기',
    '예금 이자 계산기',
    '예금계산기',
    '적금 만기 수령액',
    '예금 만기 수령액',
    '이자 계산',
    '세후 이자 계산기',
    '적금 이자',
  ],
  openGraph: {
    title: '적금·예금 이자 계산기 2026 - 머니로그',
    description: '적금, 예금 만기 수령액을 정확하게 계산해보세요. 세금 유형별 비교 가능.',
    url: 'https://money-log.company/tools/savings-calculator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://money-log.company/tools/savings-calculator',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '적금 예금 이자 계산기',
  description: '정기적금, 정기예금의 만기 수령액을 계산합니다. 일반과세, 비과세, 세금우대 비교.',
  url: 'https://money-log.company/tools/savings-calculator',
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

export default function SavingsCalculatorPage() {
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
            적금·예금 이자 계산기 <span className="text-primary">2026</span>
          </h1>
          <p className="text-text-light leading-relaxed">
            정기적금과 정기예금의 <strong>만기 수령액</strong>을 정확하게 계산해보세요.
            일반과세(15.4%), 비과세, 세금우대(9.5%) 조건별로 세후 이자를 비교할 수 있습니다.
            가입 전 얼마를 받을 수 있는지 미리 확인하세요.
          </p>
        </div>

        {/* 계산기 */}
        <SavingsCalculator />

        {/* SEO 보조 콘텐츠 */}
        <section className="mt-12 bg-bg-gray rounded-2xl p-6 md:p-8 border border-border">
          <h2 className="text-xl font-bold text-text-main mb-4">적금과 예금의 차이</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mb-6">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-text-main">구분</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-main">정기적금</th>
                  <th className="text-left py-3 px-4 font-semibold text-text-main">정기예금</th>
                </tr>
              </thead>
              <tbody className="text-text-light">
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium text-text-main">납입 방식</td>
                  <td className="py-3 px-4">매월 일정 금액 납입</td>
                  <td className="py-3 px-4">목돈을 한번에 예치</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium text-text-main">이자 계산</td>
                  <td className="py-3 px-4">납입 순서에 따라 차등</td>
                  <td className="py-3 px-4">전액에 대해 동일 적용</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 font-medium text-text-main">적합한 경우</td>
                  <td className="py-3 px-4">월급에서 꾸준히 저축</td>
                  <td className="py-3 px-4">여유자금 운용</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-bold text-text-main mb-3">이자 과세 유형 안내</h3>
          <div className="space-y-3 text-sm text-text-light">
            <p><strong className="text-text-main">일반과세 (15.4%)</strong>: 이자소득세 14% + 지방소득세 1.4%. 대부분의 금융상품에 적용됩니다.</p>
            <p><strong className="text-text-main">비과세</strong>: 세금 없이 이자 전액 수령. 조합 출자금, 비과세 종합저축(만 65세 이상) 등 특정 조건에서 가능합니다.</p>
            <p><strong className="text-text-main">세금우대 (9.5%)</strong>: 농특세 1.4% + 지방소득세 등. 새마을금고, 신협, 농협 등 조합에서 가입 가능합니다.</p>
          </div>

          <h3 className="text-lg font-bold text-text-main mt-6 mb-3">자주 묻는 질문</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-text-main">월 30만원씩 12개월 적금하면 이자가 얼마인가요?</p>
              <p className="text-text-light text-sm mt-1">연 3.5% 금리 기준, 세전 이자는 약 68,250원이며 일반과세 적용 시 세후 약 57,739원을 받게 됩니다. 위 계산기에서 정확히 확인하세요.</p>
            </div>
            <div>
              <p className="font-semibold text-text-main">적금과 예금 중 어떤 게 이자가 더 많나요?</p>
              <p className="text-text-light text-sm mt-1">같은 금리라면 예금이 이자가 더 많습니다. 적금은 매월 불입하므로 전체 이자가 예금보다 적지만, 목돈이 없을 때는 적금이 적합합니다.</p>
            </div>
          </div>
        </section>

        {/* 관련 링크 */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/posts/savings-comparison-2026" className="inline-flex items-center gap-1 bg-primary-light text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all no-underline">
            📖 2026 고금리 적금 비교
          </Link>
          <Link href="/posts/compound-interest" className="inline-flex items-center gap-1 bg-primary-light text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all no-underline">
            📖 복리의 마법
          </Link>
          <Link href="/tools/salary-calculator" className="inline-flex items-center gap-1 bg-primary-light text-primary text-sm font-medium px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all no-underline">
            💰 연봉 실수령액 계산기
          </Link>
        </div>

        <div className="mt-10">
          <CoupangBanner />
        </div>
      </MainLayout>
    </>
  );
}
