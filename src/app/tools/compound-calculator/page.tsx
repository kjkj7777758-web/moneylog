import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import CoupangBanner from '@/components/ads/CoupangBanner';
import CompoundCalculator from './CompoundCalculator';

export const metadata: Metadata = {
  title: '복리 계산기 - 복리의 마법을 직접 확인하세요',
  description:
    '복리 투자 수익을 계산해보세요. 초기 투자금과 월 적립금으로 미래 자산을 예측합니다. 단리 vs 복리 비교.',
  keywords: [
    '복리 계산기',
    '복리 이자 계산',
    '투자 수익 계산',
    '적립식 투자',
    '복리 효과',
    '72법칙',
  ],
};

export default function CompoundCalculatorPage() {
  return (
    <MainLayout>
      <CompoundCalculator />
      <div className="mt-10">
        <CoupangBanner />
      </div>
    </MainLayout>
  );
}
