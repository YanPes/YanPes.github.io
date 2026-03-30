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
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Articles', href: '/articles' },
  { label: 'Reading', href: '/articles' },
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
  ctaHref: '/articles',
};

export const stats: StatItem[] = [
  { value: '8+', label: 'Years in prod' },
  { value: '12', label: 'Articles published' },
  { value: '∞', label: 'Bundler configs' },
  { value: '↑', label: 'Always learning' },
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
