'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';

export default function Header({ onSearchOpen }: { onSearchOpen: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-[1000] h-16">
      <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-full">
        <Link href="/" className="flex items-center gap-2.5 text-[1.35rem] font-extrabold text-text-main no-underline hover:text-text-main">
          <span className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white text-[1.1rem] font-bold">M</span>
          머니로그
        </Link>

        <nav
          className={`hidden md:flex gap-2 ${menuOpen ? 'active' : ''}`}
          style={menuOpen ? {
            display: 'flex',
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
            flexDirection: 'column',
            padding: '12px 20px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            zIndex: 999,
          } : undefined}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-md text-[0.95rem] font-medium transition-all no-underline ${
                pathname === link.href
                  ? 'bg-primary-light text-primary'
                  : 'text-text-main hover:bg-primary-light hover:text-primary'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { onSearchOpen(); setMenuOpen(false); }}
            className="px-4 py-2 rounded-md text-[0.95rem] font-medium text-text-main hover:bg-primary-light hover:text-primary transition-all bg-transparent border-none cursor-pointer"
          >
            🔍
          </button>
        </nav>

        <button
          className="md:hidden bg-transparent border-none text-2xl cursor-pointer p-2 text-text-main"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
