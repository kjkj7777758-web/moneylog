'use client';

import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 w-11 h-11 bg-primary text-white border-none rounded-full text-xl cursor-pointer flex items-center justify-center shadow-md hover:bg-primary-dark hover:-translate-y-0.5 transition-all z-[900]"
      aria-label="맨 위로"
    >
      ↑
    </button>
  );
}
