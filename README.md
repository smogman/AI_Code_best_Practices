# Claude Code Best Practices

A research-backed knowledge base for getting the most out of [Claude Code](https://claude.ai/code) — synthesized from 26 sources including official docs, the Claude Code creator, industry leaders, and community experience.

Built with [Astro Starlight](https://starlight.astro.build).

## What's Inside

- **Research** — Consensus practices, contested approaches, failure modes, advanced patterns, and cost/context management
- **Guides** — How to write `CLAUDE.md`, multi-agent patterns, and a project setup checklist
- **Templates** — Ready-to-use `CLAUDE.md`, skills, hooks, subagent, and MCP config examples
- **Raw Notes** — Community-sourced Reddit threads and discussions

## Key Findings

1. **Context window is your #1 resource** — Performance degrades as it fills. Use `/clear`, subagents, and fresh sessions aggressively.
2. **Give Claude verification loops** — Tests, linters, screenshots. The single highest-leverage practice.
3. **Plan before coding** — Use Plan Mode for non-trivial tasks. Separate exploration from execution.
4. **Keep CLAUDE.md concise** — Under 300 lines. The creator uses ~100 and outperforms 800-line configs.
5. **Test-driven development** — Have Claude write tests first, then minimum code to pass them.

## Running Locally

```bash
npm install
npm run dev
```

Site runs at `http://localhost:4321`.

## Contributing

This is an ongoing research project. Contributions welcome — open a PR to add sources, correct findings, or improve templates.
