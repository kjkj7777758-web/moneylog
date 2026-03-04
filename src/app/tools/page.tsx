import type { Metadata } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: '재테크 계산기 모음 - 머니로그',
  description: '연봉 실수령액, 적금 이자, 복리 수익 계산기를 무료로 이용하세요. 2026년 최신 기준으로 정확하게 계산합니다.',
  keywords: ['재테크 계산기', '연봉 계산기', '적금 계산기', '복리 계산기', '이자 계산기'],
};

const TOOLS = [
  {
    title: '연봉 실수령액 계산기',
    description: '4대 보험, 소득세를 반영한 월 실수령액을 계산해보세요. 2026년 최신 세율 기준.',
    href: '/tools/salary-calculator',
    icon: '💰',
    badge: '인기',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    title: '적금·예금 이자 계산기',
    description: '적금, 예금 만기 수령액을 계산합니다. 일반과세, 비과세, 세금우대 비교.',
    href: '/tools/savings-calculator',
    icon: '🏦',
    badge: '필수',
    gradient: 'from-emerald-500 to-emerald-700',
  },
  {
    title: '복리 계산기',
    description: '복리의 마법을 직접 확인하세요. 장기 투자 수익을 시뮬레이션합니다.',
    href: '/tools/compound-calculator',
    icon: '📈',
    badge: '추천',
    gradient: 'from-amber-500 to-amber-700',
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-[#1a56db] to-[#1e40af] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <span className="text-amber-300 text-sm font-medium">🧮 무료 재테크 도구</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">재테크 계산기 모음</h1>
          <p className="text-blue-100 text-lg max-w-[550px] mx-auto">
            2026년 최신 기준으로 연봉, 적금, 복리를<br className="hidden md:block" />
            정확하게 계산해보세요.
          </p>
        </div>
      </section>

      <MainLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 no-underline"
            >
              {/* Card Top */}
              <div className={`bg-gradient-to-r ${tool.gradient} p-8 text-center relative`}>
                <span className="absolute top-3 right-3 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                  {tool.badge}
                </span>
                <span className="text-5xl block mb-2">{tool.icon}</span>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h2 className="text-lg font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h2>
                <p className="text-text-light text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                  계산하러 가기 <span className="text-lg">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-bg-gray rounded-2xl p-8 border border-border">
          <h3 className="text-lg font-bold text-text-main mb-4">💡 계산기 활용 팁</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-text-light">
            <div>
              <p className="font-semibold text-text-main mb-1">연봉 협상 전</p>
              <p>연봉 실수령액 계산기로 세후 월급을 미리 확인하고 협상에 활용하세요.</p>
            </div>
            <div>
              <p className="font-semibold text-text-main mb-1">적금 가입 전</p>
              <p>금리별 이자를 비교하고 비과세 혜택이 가능한지 확인해보세요.</p>
            </div>
            <div>
              <p className="font-semibold text-text-main mb-1">장기 투자 계획</p>
              <p>복리 계산기로 10년, 20년 후 자산을 시뮬레이션해보세요.</p>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
