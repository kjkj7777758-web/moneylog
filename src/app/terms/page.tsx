import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관',
  description: '머니로그 이용약관',
};

export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-10 pb-15">
      <h1 className="text-[2rem] font-bold mb-2">이용약관</h1>
      <p className="text-text-light mb-8">시행일: 2026년 1월 1일</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">제1조 (목적)</h2>
      <p className="mb-4 leading-relaxed">이 약관은 머니로그(이하 &quot;블로그&quot;)가 제공하는 서비스의 이용 조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다.</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">제2조 (서비스의 내용)</h2>
      <p className="mb-4 leading-relaxed">블로그는 경제, 재테크, 금융 관련 정보성 콘텐츠를 제공합니다. 제공되는 모든 정보는 참고용이며, 투자나 금융 결정에 대한 전문적인 조언이 아닙니다.</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">제3조 (면책 조항)</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>블로그에 게시된 정보는 작성 시점의 자료를 기반으로 하며, 최신 정보와 다를 수 있습니다.</li>
        <li>블로그의 정보를 바탕으로 한 투자 결정으로 발생한 손실에 대해 블로그는 책임지지 않습니다.</li>
        <li>금융 상품 관련 내용은 해당 금융기관에서 직접 확인하시기 바랍니다.</li>
      </ul>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">제4조 (저작권)</h2>
      <p className="mb-4 leading-relaxed">블로그에 게시된 모든 콘텐츠의 저작권은 머니로그에 있으며, 무단 복제 및 배포를 금합니다. 인용 시 출처를 명시해 주시기 바랍니다.</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">제5조 (광고)</h2>
      <p className="mb-4 leading-relaxed">블로그에는 Google AdSense 등 제3자 광고가 포함될 수 있습니다. 광고 내용은 블로그의 의견과 무관하며, 광고주의 책임 하에 게시됩니다.</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">제6조 (약관의 변경)</h2>
      <p className="mb-4 leading-relaxed">본 약관은 필요에 따라 변경될 수 있으며, 변경된 약관은 블로그에 게시함으로써 효력이 발생합니다.</p>
    </div>
  );
}
