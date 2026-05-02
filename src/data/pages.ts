export interface PageEntry {
  title: string;
  description: string;
  date: string;
  slug: string;
  category: 'research' | 'guides' | 'templates' | 'raw-notes';
  icon: string;
  isNew?: boolean;
}

export const pages: PageEntry[] = [
  // Research
  {
    title: 'Consensus Practices',
    description: '12 best practices with broad agreement across the community — the things nearly everyone agrees on, backed by 5+ independent sources each.',
    date: '2026-04-11',
    slug: '/research/consensus-practices/',
    category: 'research',
    icon: '✅',
  },
  {
    title: 'Contested Practices',
    description: '5 practices where the community disagrees — both sides of each debate with evidence, so you can decide what fits your workflow.',
    date: '2026-04-11',
    slug: '/research/contested-practices/',
    category: 'research',
    icon: '⚖️',
  },
  {
    title: 'Failure Modes',
    description: '13 documented pitfalls and anti-patterns with symptoms, root causes, and mitigations — learn from others\' mistakes.',
    date: '2026-05-01',
    slug: '/research/failure-modes/',
    category: 'research',
    icon: '⚠️',
    isNew: true,
  },
  {
    title: 'Advanced Patterns',
    description: '14 power-user techniques: Writer/Reviewer, Factory Model, fan-out migrations, SPEC pipelines, auto mode, prompt caching, git workflow discipline, and more.',
    date: '2026-05-01',
    slug: '/research/advanced-patterns/',
    category: 'research',
    icon: '🔬',
    isNew: true,
  },
  {
    title: 'Cost & Context',
    description: 'Token optimization, pricing tiers ($13/dev/day avg), context degradation curves, prompt caching discipline, and practical budgeting strategies.',
    date: '2026-04-11',
    slug: '/research/cost-and-context/',
    category: 'research',
    icon: '💰',
  },
  {
    title: 'Sources & Bibliography',
    description: 'Annotated bibliography of 32 sources with credibility ratings — official docs, creator insights, industry analysis, and community experience.',
    date: '2026-05-01',
    slug: '/research/sources/',
    category: 'research',
    icon: '📚',
    isNew: true,
  },
  // Guides
  {
    title: 'Writing CLAUDE.md',
    description: 'The definitive guide to crafting effective CLAUDE.md files — WHY/WHAT/HOW framework, size guidelines, progressive disclosure.',
    date: '2026-04-11',
    slug: '/guides/claude-md-guide/',
    category: 'guides',
    icon: '📝',
  },
  {
    title: 'Multi-Agent Patterns',
    description: 'When and how to use parallel agents — three tiers from subagents to full orchestration, worktrees, quality gates, and failure modes.',
    date: '2026-04-11',
    slug: '/guides/multi-agent-guide/',
    category: 'guides',
    icon: '🤖',
  },
  {
    title: 'Project Setup Checklist',
    description: '12-step guide to setting up a new project for optimal Claude Code usage — from git init to CI integration.',
    date: '2026-04-11',
    slug: '/guides/project-setup/',
    category: 'guides',
    icon: '🚀',
  },
  // Templates
  {
    title: 'CLAUDE.md Template',
    description: 'Ready-to-use starter CLAUDE.md in three variants: full (~100 lines), minimal (~30 lines), and monorepo with parent+child hierarchy.',
    date: '2026-04-11',
    slug: '/templates/claude-md-template/',
    category: 'templates',
    icon: '📋',
  },
  {
    title: 'Skills Examples',
    description: '5 complete skill files: fix-issue, code-review, new-api-endpoint, refactor, and research — ready to drop into .claude/skills/.',
    date: '2026-04-11',
    slug: '/templates/skills-examples/',
    category: 'templates',
    icon: '⚡',
  },
  {
    title: 'Hooks Examples',
    description: '6 hook configurations: pre-commit security, post-edit linting, TypeScript checks, migration guards, audit logging, test verification.',
    date: '2026-04-11',
    slug: '/templates/hooks-examples/',
    category: 'templates',
    icon: '🪝',
  },
  {
    title: 'Subagent Examples',
    description: '4 specialist subagent definitions: security reviewer, test writer, documentation writer, and performance analyst.',
    date: '2026-04-11',
    slug: '/templates/agents-examples/',
    category: 'templates',
    icon: '🧩',
  },
  {
    title: 'MCP Configuration',
    description: 'Ready-to-use .mcp.json templates for PostgreSQL (read-only), Sentry, GitHub, Playwright, and filesystem access.',
    date: '2026-04-11',
    slug: '/templates/mcp-config/',
    category: 'templates',
    icon: '🔌',
  },
  // Raw Notes
  {
    title: 'Reddit Posts',
    description: 'Original Reddit posts that sparked this research — 500k lines in 90 days, multi-agent orchestration prompts, and community commentary.',
    date: '2026-04-11',
    slug: '/raw-notes/reddit-posts/',
    category: 'raw-notes',
    icon: '💬',
  },
];

export const categoryMeta: Record<string, { label: string; color: string; glow: string }> = {
  research: { label: 'Research', color: '#818cf8', glow: 'rgba(129, 140, 248, 0.3)' },
  guides: { label: 'Guides', color: '#34d399', glow: 'rgba(52, 211, 153, 0.3)' },
  templates: { label: 'Templates', color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.3)' },
  'raw-notes': { label: 'Raw Notes', color: '#f87171', glow: 'rgba(248, 113, 113, 0.3)' },
};
