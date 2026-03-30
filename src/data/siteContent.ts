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

export type ContactPlatform = 'github' | 'linkedin' | 'x' | 'discord';

export interface ContactLink {
  label: string;
  href: string;
  platform: ContactPlatform;
  iconSrc: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
];

export const contactLinks: ContactLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/YanPes',
    platform: 'github',
    iconSrc: 'https://api.iconify.design/simple-icons:github.svg?color=%23ffffff',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yannik-peschke-a48012108/',
    platform: 'linkedin',
    iconSrc: 'https://api.iconify.design/simple-icons:linkedin.svg?color=%23ffffff',
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/_yanpes',
    platform: 'x',
    iconSrc: 'https://api.iconify.design/simple-icons:x.svg?color=%23ffffff',
  },
  {
    label: 'Discord',
    href: 'https://discordapp.com/users/rettichmann',
    platform: 'discord',
    iconSrc: 'https://api.iconify.design/simple-icons:discord.svg?color=%23ffffff',
  },
];

export const heroContent = {
  statuses: ['Available for consulting', 'Available for hire'],
  title: "Hi, I am ",
  accentName: 'Yannik.',
  role: 'Software Architect · Teacher & Mentor · Problem Solver · Trailrunner',
  ctaLabel: 'Read my articles',
  ctaHref: '/articles',
  contactLinks,
};

export const stats: StatItem[] = [
  { value: '8+', label: 'Years in prod' },
  { value: '12', label: 'Articles published' },
  { value: '∞', label: 'Bundler configs' },
  { value: '↑', label: 'Always learning' },
];
