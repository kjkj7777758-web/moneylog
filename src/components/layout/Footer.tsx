import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-text-lighter pt-12 pb-6 mt-15">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
          <div>
            <h4 className="text-white text-base font-bold mb-4">머니로그</h4>
            <p className="text-[0.9rem] leading-relaxed">
              경제와 재테크 정보를 쉽고 정확하게 전달하는 블로그입니다. 누구나 이해할 수 있는 경제 콘텐츠를 통해 더 나은 경제 생활을 돕겠습니다.
            </p>
          </div>
          <div>
            <h4 className="text-white text-base font-bold mb-4">카테고리</h4>
            <ul className="space-y-2">
              <li><Link href="/category/savings" className="text-text-lighter text-[0.9rem] hover:text-white no-underline">저축·예금</Link></li>
              <li><Link href="/category/investment" className="text-text-lighter text-[0.9rem] hover:text-white no-underline">주식·투자</Link></li>
              <li><Link href="/category/realestate" className="text-text-lighter text-[0.9rem] hover:text-white no-underline">부동산</Link></li>
              <li><Link href="/category/saving-tips" className="text-text-lighter text-[0.9rem] hover:text-white no-underline">절약·생활경제</Link></li>
              <li><Link href="/category/economy" className="text-text-lighter text-[0.9rem] hover:text-white no-underline">경제상식</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-base font-bold mb-4">정보</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-text-lighter text-[0.9rem] hover:text-white no-underline">소개</Link></li>
              <li><Link href="/contact" className="text-text-lighter text-[0.9rem] hover:text-white no-underline">문의하기</Link></li>
              <li><Link href="/privacy" className="text-text-lighter text-[0.9rem] hover:text-white no-underline">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="text-text-lighter text-[0.9rem] hover:text-white no-underline">이용약관</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-base font-bold mb-4">구독</h4>
            <p className="text-[0.9rem] mb-3">새로운 글을 놓치지 마세요.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-[0.85rem] gap-3">
          <span>&copy; 2026 머니로그. All rights reserved.</span>
          <span>본 블로그의 콘텐츠는 정보 제공 목적이며 투자 조언이 아닙니다.</span>
        </div>
      </div>
    </footer>
  );
}
