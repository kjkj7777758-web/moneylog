'use client';

export default function ContactForm() {
  return (
    <form className="max-w-[600px] mx-auto mt-8" onSubmit={(e) => e.preventDefault()}>
      <div className="mb-5">
        <label className="block font-semibold mb-1.5 text-[0.95rem]">이름</label>
        <input
          type="text"
          required
          maxLength={100}
          className="w-full px-4 py-3 border border-border rounded-lg text-base font-[inherit] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,86,219,0.1)]"
          placeholder="이름을 입력하세요"
        />
      </div>
      <div className="mb-5">
        <label className="block font-semibold mb-1.5 text-[0.95rem]">이메일</label>
        <input
          type="email"
          required
          maxLength={254}
          className="w-full px-4 py-3 border border-border rounded-lg text-base font-[inherit] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,86,219,0.1)]"
          placeholder="이메일 주소를 입력하세요"
        />
      </div>
      <div className="mb-5">
        <label className="block font-semibold mb-1.5 text-[0.95rem]">문의 유형</label>
        <select required className="w-full px-4 py-3 border border-border rounded-lg text-base font-[inherit] focus:outline-none focus:border-primary">
          <option>콘텐츠 관련</option>
          <option>광고/제휴</option>
          <option>기술 문의</option>
          <option>기타</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block font-semibold mb-1.5 text-[0.95rem]">메시지</label>
        <textarea
          required
          maxLength={5000}
          className="w-full px-4 py-3 border border-border rounded-lg text-base font-[inherit] h-40 resize-y focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(26,86,219,0.1)]"
          placeholder="문의 내용을 입력하세요"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:bg-primary-dark transition-colors"
      >
        보내기
      </button>
      <p className="text-[0.85rem] text-text-light mt-3">현재 폼 전송 기능은 준비 중입니다. 이메일로 문의해주세요.</p>
    </form>
  );
}
