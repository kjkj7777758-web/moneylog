import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
  description: '머니로그는 경제와 재테크 정보를 쉽고 정확하게 전달하는 블로그입니다.',
};

export default function AboutPage() {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-10 pb-15">
      <h1 className="text-[2rem] font-bold mb-2">머니로그 소개</h1>
      <p className="text-text-light mb-8">경제를 쉽게, 재테크를 정확하게</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">블로그 소개</h2>
      <p className="mb-4 leading-relaxed">
        머니로그는 복잡한 경제와 재테크 정보를 누구나 이해할 수 있도록 쉽고 정확하게 전달하는 것을 목표로 합니다.
        금융 전문가가 아니더라도 올바른 경제적 판단을 할 수 있도록 실용적인 정보를 제공합니다.
      </p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">다루는 주제</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>저축·예금</strong> - 효율적인 저축 습관, 적금 상품 비교, 예금자보호</li>
        <li><strong>주식·투자</strong> - 기초 개념부터 포트폴리오 구성, ETF, 채권</li>
        <li><strong>부동산</strong> - 내 집 마련 전략, 전월세, 청약, 세금</li>
        <li><strong>절약·생활경제</strong> - 가계부, 생활비 절약, 소비 습관</li>
        <li><strong>경제상식</strong> - 금리, 환율, 인플레이션, 경제 지표</li>
      </ul>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">핵심 가치</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>정확성</strong> - 한국은행, 금융위원회, 국세청, 통계청 등 공신력 있는 출처 기반</li>
        <li><strong>실용성</strong> - 바로 활용 가능한 실전 정보 중심</li>
        <li><strong>접근성</strong> - 전문 용어를 쉬운 말로 풀어 설명</li>
      </ul>

      <div className="bg-[#fffbeb] border border-[#fde68a] rounded-lg p-5 mt-8">
        <h4 className="text-[#b45309] font-bold mb-2">면책 조항</h4>
        <p className="text-[0.95rem]">
          머니로그의 모든 콘텐츠는 정보 제공 목적으로 작성되었으며, 특정 금융 상품에 대한 투자 권유가 아닙니다.
          투자 결정은 본인의 판단과 책임 하에 이루어져야 하며, 필요 시 전문 재무상담사와 상담하시기를 권장합니다.
        </p>
      </div>
    </div>
  );
}
