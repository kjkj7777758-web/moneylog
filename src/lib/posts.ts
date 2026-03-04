import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFrontmatter, CategorySlug } from '@/types';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      return getPostBySlug(slug);
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post {
  if (slug.includes('/') || slug.includes('\\') || slug.includes('..')) {
    throw new Error('Invalid slug');
  }
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...(data as PostFrontmatter),
    slug,
    content,
  };
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''));
}

export function getRecentPosts(count: number = 5): Post[] {
  return getAllPosts().slice(0, count);
}

export function getFeaturedPost(): Post {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) || posts[0];
}
