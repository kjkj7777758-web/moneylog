'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import { CategorySlug } from '@/types';

export default function CategoryTabs() {
  const pathname = usePathname();
  const categorySlugs = Object.keys(CATEGORIES) as CategorySlug[];

  const tabs = [
    { href: '/', label: '전체' },
    ...categorySlugs.map((slug) => ({
      href: `/category/${slug}`,
      label: `${CATEGORIES[slug].icon} ${CATEGORIES[slug].name}`,
    })),
  ];

  return (
    <nav className="bg-white border-b border-border overflow-x-auto">
      <div className="max-w-[1200px] mx-auto px-5 flex gap-1">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`py-3.5 px-5 whitespace-nowrap text-[0.9rem] font-medium border-b-2 transition-all no-underline ${
              pathname === tab.href
                ? 'text-primary border-primary'
                : 'text-text-light border-transparent hover:text-primary hover:border-primary'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
