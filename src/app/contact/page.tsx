import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: '문의하기',
  description: '머니로그에 문의사항이 있으시면 아래 양식을 통해 연락해 주세요.',
};

export default function ContactPage() {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-10 pb-15">
      <h1 className="text-[2rem] font-bold mb-2">문의하기</h1>
      <p className="text-text-light mb-8">머니로그에 대한 문의, 제안, 피드백을 보내주세요.</p>

      <h2 className="text-[1.5rem] font-bold mt-9 mb-3">문의 유형 안내</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li><strong>콘텐츠 관련</strong> - 기사 정정, 추가 정보 요청, 주제 제안</li>
        <li><strong>광고/제휴</strong> - 광고 게재, 콘텐츠 제휴 문의</li>
        <li><strong>기술 문의</strong> - 사이트 이용 중 발생한 기술적 문제</li>
        <li><strong>기타</strong> - 그 외 문의사항</li>
      </ul>

      <ContactForm />

      <h2 className="text-[1.5rem] font-bold mt-12 mb-3">자주 묻는 질문</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-[1.1rem] font-bold mb-1">답변은 얼마나 걸리나요?</h3>
          <p className="text-text-light">보통 1~3 영업일 이내에 답변 드리고 있습니다.</p>
        </div>
        <div>
          <h3 className="text-[1.1rem] font-bold mb-1">특정 주제 글 요청이 가능한가요?</h3>
          <p className="text-text-light">네, 콘텐츠 제안은 언제든 환영합니다. 문의 양식을 통해 알려주세요.</p>
        </div>
      </div>
    </div>
  );
}
