import Link from 'next/link';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="py-4 text-[0.85rem] text-text-lighter max-w-[1200px] mx-auto px-5">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">&gt;</span>}
          {item.href ? (
            <Link href={item.href} className="text-text-light no-underline hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
