// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://smogman.github.io',
  base: '/AI_Code_best_Practices',
  integrations: [
    starlight({
      title: 'Claude Code Best Practices',
      description: 'Research-backed guide to getting the most out of Claude Code',
      social: [],
      sidebar: [
        {
          label: '101 — Foundations',
          items: [
            { label: 'Course Overview', slug: '101' },
            { label: 'What is Claude Code & Installation', slug: '101/what-is-claude-code' },
            { label: 'Your First Session', slug: '101/first-session' },
            { label: 'Essential Slash Commands', slug: '101/slash-commands' },
            { label: 'Understanding Permissions', slug: '101/permissions' },
          ],
        },
        {
          label: '102 — Project Setup',
          items: [
            { label: 'Course Overview', slug: '102' },
            { label: 'CLAUDE.md Basics', slug: '102/claude-md-basics' },
            { label: 'Project Setup Checklist', slug: '102/project-setup' },
            { label: 'Understanding the Context Window', slug: '102/context-window' },
          ],
        },
        {
          label: '201 — Working Effectively',
          items: [
            { label: 'Course Overview', slug: '201' },
            { label: 'Context Management', slug: '201/context-management' },
            { label: 'Plan Mode', slug: '201/plan-mode' },
            { label: 'Verification Loops', slug: '201/verification-loops' },
            { label: 'Writing a Great CLAUDE.md', slug: '201/great-claude-md' },
          ],
        },
        {
          label: '202 — Power Features',
          items: [
            { label: 'Course Overview', slug: '202' },
            { label: 'Hooks', slug: '202/hooks' },
            { label: 'Skills (Custom Commands)', slug: '202/skills' },
            { label: 'MCP Servers', slug: '202/mcp-servers' },
            { label: 'Multi-Agent Basics', slug: '202/multi-agent-basics' },
          ],
        },
        {
          label: '300 — Advanced Patterns',
          items: [
            { label: 'Course Overview', slug: '300' },
            { label: 'Multi-Agent Architectures', slug: '300/multi-agent-architectures' },
            { label: 'Advanced Patterns', slug: '300/advanced-patterns' },
            { label: 'Cost & Token Optimization', slug: '300/cost-optimization' },
          ],
        },
        {
          label: 'Reference',
          collapsed: true,
          items: [
            { label: 'Consensus Practices', slug: 'research/consensus-practices' },
            { label: 'Contested Practices', slug: 'research/contested-practices' },
            { label: 'Failure Modes', slug: 'research/failure-modes' },
            { label: 'Advanced Patterns (Research)', slug: 'research/advanced-patterns' },
            { label: 'Cost & Context (Research)', slug: 'research/cost-and-context' },
            { label: 'Sources & Bibliography', slug: 'research/sources' },
            { label: 'CLAUDE.md Template', slug: 'templates/claude-md-template' },
            { label: 'Skills Examples', slug: 'templates/skills-examples' },
            { label: 'Hooks Examples', slug: 'templates/hooks-examples' },
            { label: 'Subagent Examples', slug: 'templates/agents-examples' },
            { label: 'MCP Configuration', slug: 'templates/mcp-config' },
          ],
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
    react(),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
