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

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
];

export const heroContent = {
  statuses: ['Available for consulting', 'Available for hire'],
  title: "Hi, I am ",
  accentName: 'Yannik.',
  role: 'Software Architect · Teacher & Mentor · Problem Solver · Trailrunner',
  ctaLabel: 'Read my articles',
  ctaHref: '/articles',
};

export const stats: StatItem[] = [
  { value: '8+', label: 'Years in prod' },
  { value: '12', label: 'Articles published' },
  { value: '∞', label: 'Bundler configs' },
  { value: '↑', label: 'Always learning' },
];

