import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import CoupangBanner from '@/components/ads/CoupangBanner';
import SalaryCalculator from './SalaryCalculator';

export const metadata: Metadata = {
  title: '연봉 실수령액 계산기 - 2026년 최신 기준',
  description:
    '2026년 최신 세율 기준 연봉 실수령액을 계산해보세요. 4대 보험, 소득세, 지방소득세를 정확하게 계산합니다.',
  keywords: [
    '연봉 실수령액',
    '연봉 계산기',
    '실수령액 계산',
    '4대보험 계산',
    '소득세 계산',
    '2026 연봉',
  ],
};

export default function SalaryCalculatorPage() {
  return (
    <MainLayout>
      <SalaryCalculator />
      <CoupangBanner />
    </MainLayout>
  );
}
