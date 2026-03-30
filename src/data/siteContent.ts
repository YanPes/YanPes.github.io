import { blogPosts } from './blogPosts';

export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ArticleItem {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  href: string;
  featuredNumber?: string;
}

export interface StackItem {
  label: string;
  highlight?: boolean;
}

const compactDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

const [latestPost] = blogPosts;

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#articles' },
  { label: 'Reading', href: latestPost?.mediumUrl ?? '#articles' },
  { label: 'Stack', href: '#stack' },
];

export const heroContent = {
  statuses: ['Available for consulting', 'Available for hire'],
  title: "Hi, I'm",
  accentName: 'Yannik.',
  role: 'Software Architect · Problem Solver · Trailrunner',
  description:
    'I transform complex web systems into interconnected, scalable ecosystems — sharing insights from building distributed systems and micro-frontend architectures.',
  ctaLabel: 'Read my articles',
  ctaHref: '#articles',
};

export const stats: StatItem[] = [
  { value: '8+', label: 'Years in prod' },
  { value: '12', label: 'Articles published' },
  { value: '∞', label: 'Bundler configs' },
  { value: '↑', label: 'Always learning' },
];

export const featuredArticle: ArticleItem = {
  title: 'Module Federation in Practice: Lessons from Production',
  excerpt:
    "After implementing module federation across multiple teams, I've learned what works and what doesn't. Here are the patterns that emerged from real-world usage.",
  date: 'Jan 2025',
  readTime: '9 min',
  tag: 'Module Federation',
  href: latestPost?.mediumUrl ?? '#',
  featuredNumber: '01',
};

export const recentArticles: ArticleItem[] = [
  {
    title: latestPost?.title ?? 'Enterprise Architecture Decisions with Module Federation',
    excerpt:
      latestPost?.description ??
      'A guide to navigating the architectural decisions that define large-scale frontend systems.',
    date: latestPost ? compactDate(latestPost.date) : 'Dec 2024',
    readTime: latestPost?.readTime.replace(' read', '') ?? '7 min',
    tag: latestPost?.tags[2] ?? 'Architecture',
    href: latestPost?.mediumUrl ?? '#',
  },
  {
    title: 'Migrating to Rspack: A Production Story',
    excerpt: 'How we cut build times by 70% and what we had to give up to get there.',
    date: 'Nov 2024',
    readTime: '5 min',
    tag: 'Rspack',
    href: '#',
  },
];

export const stackItems: StackItem[] = [
  { label: 'TypeScript', highlight: true },
  { label: 'Rspack', highlight: true },
  { label: 'Module Federation', highlight: true },
  { label: 'React', highlight: true },
  { label: 'Webpack' },
  { label: 'Vite' },
  { label: 'Node.js' },
  { label: 'Docker' },
  { label: 'Kubernetes' },
  { label: 'Playwright' },
  { label: 'Vitest' },
  { label: 'Neovim' },
  { label: 'Arch Linux' },
  { label: 'GitLab CI' },
  { label: 'Traefik' },
];
