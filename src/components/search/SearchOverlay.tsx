'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchItem {
  title: string;
  excerpt: string;
  category: string;
  slug: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  posts: SearchItem[];
  initialQuery?: string;
}

export default function SearchOverlay({ isOpen, onClose, posts, initialQuery = '' }: SearchOverlayProps) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.length >= 2
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[2000] flex items-start justify-center pt-[120px]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-[600px] shadow-lg">
        <input
          ref={inputRef}
          type="text"
          maxLength={200}
          placeholder="검색어를 입력하세요..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-3.5 px-4 border-2 border-border rounded-lg text-[1.1rem] outline-none focus:border-primary"
          aria-label="검색"
        />
        <div className="mt-4 max-h-[400px] overflow-y-auto">
          {query.length >= 2 && results.length === 0 && (
            <p className="p-3 text-text-light">검색 결과가 없습니다.</p>
          )}
          {results.map((post) => (
            <div key={post.slug} className="p-3 border-b border-border last:border-b-0">
              <Link
                href={`/posts/${post.slug}`}
                className="text-text-main font-semibold no-underline hover:text-primary"
                onClick={onClose}
              >
                {post.title}
              </Link>
              <p className="text-[0.85rem] text-text-light mt-1">
                {post.excerpt.substring(0, 80)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
