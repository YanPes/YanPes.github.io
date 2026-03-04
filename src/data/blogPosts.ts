export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  readTime: string;
  tags: string[];
  mediumUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'your-guide-to-architectural-decisions-in-enterprise-development-with-module-federation',
    title: 'Your Guide to Architectural Decisions in Enterprise Development with Module Federation',
    date: 'January 29, 2025',
    description: "A practical decision guide for enterprise frontend architecture, explaining when to use a basic SPA/MPC versus Module Federation and how federation helps decentralized teams avoid double-deploy overhead.",
    readTime: '7 min read',
    tags: ['Microfrontends', 'Software Architecture', 'Module Federation', 'Enterprise Software'],
    mediumUrl: 'https://medium.com/@yannik.peschke/your-guide-to-architectural-decisions-in-enterprise-development-with-module-federation-8f289e43edba',
  },
];
