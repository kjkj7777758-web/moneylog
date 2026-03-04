import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import CoupangBanner from '@/components/ads/CoupangBanner';
import SavingsCalculator from './SavingsCalculator';

export const metadata: Metadata = {
  title: '적금·예금 이자 계산기 - 2026년 최신',
  description:
    '적금, 예금 이자를 정확하게 계산해보세요. 일반과세, 비과세, 세금우대까지 세후 실수령액을 계산합니다.',
  keywords: [
    '적금 이자 계산기',
    '예금 이자 계산기',
    '적금 계산기',
    '이자 계산',
    '세후 이자',
    '만기 수령액',
  ],
};

export default function SavingsCalculatorPage() {
  return (
    <MainLayout>
      <SavingsCalculator />
      <div className="mt-10">
        <CoupangBanner />
      </div>
    </MainLayout>
  );
}
