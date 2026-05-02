export interface PageEntry {
  title: string;
  description: string;
  slug: string;
  category: '101' | '102' | '201' | '202' | '300';
  badge: string;
  badgeColor: string;
  lessons: number;
}

export const courses: PageEntry[] = [
  {
    title: '101 — Foundations',
    description: 'Install Claude Code, have your first session, learn the essential slash commands, and understand the permission model. No prior experience needed.',
    slug: '/101/',
    category: '101',
    badge: 'Beginner',
    badgeColor: '#34d399',
    lessons: 4,
  },
  {
    title: '102 — Project Setup',
    description: 'Write your first CLAUDE.md, run the project setup checklist, and understand why the context window is your most important resource.',
    slug: '/102/',
    category: '102',
    badge: 'Beginner',
    badgeColor: '#34d399',
    lessons: 3,
  },
  {
    title: '201 — Working Effectively',
    description: 'Context management, Plan Mode, verification loops, and advanced CLAUDE.md. The practices with the strongest evidence for quality improvement.',
    slug: '/201/',
    category: '201',
    badge: 'Intermediate',
    badgeColor: '#818cf8',
    lessons: 4,
  },
  {
    title: '202 — Power Features',
    description: 'Hooks, Skills, MCP servers, and multi-agent basics. The features that separate power users from everyone else.',
    slug: '/202/',
    category: '202',
    badge: 'Intermediate',
    badgeColor: '#818cf8',
    lessons: 4,
  },
  {
    title: '300 — Advanced Patterns',
    description: 'Multi-agent architectures (Writer/Reviewer, Factory, SPEC pipelines), git discipline, prompt caching, and cost optimization.',
    slug: '/300/',
    category: '300',
    badge: 'Advanced',
    badgeColor: '#f87171',
    lessons: 3,
  },
];
