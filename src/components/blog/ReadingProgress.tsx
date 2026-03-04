'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setWidth((window.scrollY / docHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[1100] h-[3px] bg-primary transition-[width] duration-100" style={{ width: `${width}%` }} />
  );
}
