import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/constants';

const SITE_URL = 'https://money-log.company';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const categoryEntries = Object.keys(CATEGORIES).map((slug) => ({
    url: `${SITE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = ['about', 'contact', 'privacy', 'terms'].map((page) => ({
    url: `${SITE_URL}/${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...categoryEntries,
    ...postEntries,
    ...staticPages,
  ];
}
