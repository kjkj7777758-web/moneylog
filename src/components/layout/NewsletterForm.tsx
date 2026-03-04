'use client';

export default function NewsletterForm() {
  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        required
        maxLength={254}
        placeholder="이메일 주소"
        className="flex-1 px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white text-[0.9rem]"
        aria-label="이메일 주소"
      />
      <button type="submit" className="px-4 py-2 bg-primary text-white border-none rounded-md text-[0.85rem] font-semibold cursor-pointer hover:bg-primary-dark">
        구독
      </button>
    </form>
  );
}
