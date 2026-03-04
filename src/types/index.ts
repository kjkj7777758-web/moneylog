export type CategorySlug = 'savings' | 'investment' | 'realestate' | 'saving-tips' | 'economy';

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: CategorySlug;
  categoryLabel: string;
  image: string;
  imageAlt: string;
  readTime: number;
  author: string;
  tags: string[];
  featured?: boolean;
  prevPost?: { slug: string; title: string };
  nextPost?: { slug: string; title: string };
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: string;
  description: string;
}
