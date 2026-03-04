import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '머니로그 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-10 pb-15">
      <h1 className="text-[2rem] font-bold mb-2">개인정보처리방침</h1>
      <p className="text-text-light mb-8">시행일: 2026년 1월 1일</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">1. 개인정보의 수집 및 이용 목적</h2>
      <p className="mb-4 leading-relaxed">머니로그(이하 &quot;블로그&quot;)는 다음 목적을 위해 개인정보를 수집하고 이용합니다.</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>문의 접수 및 답변 처리</li>
        <li>뉴스레터 발송 (구독 신청 시)</li>
        <li>서비스 이용 통계 분석 및 개선</li>
        <li>부정 이용 방지</li>
      </ul>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">2. 수집하는 개인정보 항목</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>문의 양식</strong>: 이름, 이메일 주소, 문의 내용</li>
        <li><strong>뉴스레터 구독</strong>: 이메일 주소</li>
        <li><strong>자동 수집</strong>: 방문 기록, IP 주소, 브라우저 정보, 쿠키</li>
      </ul>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">3. 개인정보 보유 및 이용 기간</h2>
      <p className="mb-4 leading-relaxed">수집된 개인정보는 수집 목적이 달성되면 즉시 파기합니다. 단, 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관합니다.</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">4. 쿠키 사용</h2>
      <p className="mb-4 leading-relaxed">본 블로그는 Google AdSense 및 Google Analytics를 사용하며, 이 과정에서 쿠키가 사용될 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키를 관리할 수 있습니다.</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">5. 개인정보의 제3자 제공</h2>
      <p className="mb-4 leading-relaxed">머니로그는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에 의한 요청이 있는 경우에는 예외로 합니다.</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">6. 이용자의 권리</h2>
      <p className="mb-4 leading-relaxed">이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있으며, 뉴스레터 구독 해지도 자유롭게 가능합니다.</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">7. 문의</h2>
      <p className="mb-4 leading-relaxed">개인정보 처리에 관한 문의는 문의하기 페이지를 통해 접수해 주시기 바랍니다.</p>
    </div>
  );
}
