// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Claude Code Best Practices',
      description: 'Research-backed guide to getting the most out of Claude Code',
      social: [],
      sidebar: [
        {
          label: 'Research',
          items: [
            { label: 'Sources & Bibliography', slug: 'research/sources' },
            { label: 'Consensus Practices', slug: 'research/consensus-practices' },
            { label: 'Contested Practices', slug: 'research/contested-practices' },
            { label: 'Failure Modes', slug: 'research/failure-modes' },
            { label: 'Advanced Patterns', slug: 'research/advanced-patterns' },
            { label: 'Cost & Context', slug: 'research/cost-and-context' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Writing CLAUDE.md', slug: 'guides/claude-md-guide' },
            { label: 'Multi-Agent Patterns', slug: 'guides/multi-agent-guide' },
            { label: 'Project Setup Checklist', slug: 'guides/project-setup' },
          ],
        },
        {
          label: 'Templates',
          items: [
            { label: 'CLAUDE.md Template', slug: 'templates/claude-md-template' },
            { label: 'Skills Examples', slug: 'templates/skills-examples' },
            { label: 'Hooks Examples', slug: 'templates/hooks-examples' },
            { label: 'Subagent Examples', slug: 'templates/agents-examples' },
            { label: 'MCP Configuration', slug: 'templates/mcp-config' },
          ],
        },
        {
          label: 'Raw Notes',
          items: [
            { label: 'Reddit Posts', slug: 'raw-notes/reddit-posts' },
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
