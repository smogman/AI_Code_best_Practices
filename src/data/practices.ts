export type PracticeCategory = 'consensus' | 'contested' | 'advanced' | 'failure-mode';

export type PracticeTag =
  | 'context'
  | 'testing'
  | 'planning'
  | 'prompting'
  | 'parallel'
  | 'cost'
  | 'claude-md'
  | 'mcp'
  | 'hooks'
  | 'skills'
  | 'subagents'
  | 'git'
  | 'review'
  | 'session'
  | 'architecture'
  | 'automation';

export interface Practice {
  id: string;
  title: string;
  category: PracticeCategory;
  confidence: 1 | 2 | 3 | 4 | 5;
  tags: PracticeTag[];
  summary: string;
  sourceIds: string[];
  proArguments?: string[];
  conArguments?: string[];
}

export const practices: Practice[] = [
  // === CONSENSUS PRACTICES ===
  {
    id: 'context-window-management',
    title: 'Context Window Is Your #1 Resource',
    category: 'consensus',
    confidence: 5,
    tags: ['context', 'session'],
    summary: 'Performance degrades as the context window fills. Use /clear between tasks, subagents for research, and fresh sessions aggressively. At 70% capacity precision drops, at 85% hallucinations increase, at 90%+ responses become erratic.',
    sourceIds: ['anthropic-best-practices', 'boris-cherny-workflow', 'humanlayer-claude-md', 'sankalp-experience', 'anthropic-costs'],
  },
  {
    id: 'verification-loops',
    title: 'Give Claude Verification Loops',
    category: 'consensus',
    confidence: 5,
    tags: ['testing', 'review'],
    summary: 'Include tests, linters, screenshots, or expected outputs so Claude can check its own work. This is the single highest-leverage practice. Boris Cherny says it gives a 2-3x quality improvement.',
    sourceIds: ['anthropic-best-practices', 'boris-cherny-workflow', 'addy-osmani-agentic', 'dev-to-pitfalls', 'eesel-best-practices'],
  },
  {
    id: 'plan-before-code',
    title: 'Plan Before Coding',
    category: 'consensus',
    confidence: 5,
    tags: ['planning'],
    summary: 'Use Plan Mode to separate exploration from execution. For any non-trivial task: Explore -> Plan -> Implement -> Commit. If Claude makes the right call 80% of the time and a feature has 20 decision points, planning collapses those into a reviewed spec near 100%.',
    sourceIds: ['anthropic-best-practices', 'boris-cherny-workflow', 'addy-osmani-agentic', 'eesel-best-practices', 'sankalp-experience'],
  },
  {
    id: 'concise-claude-md',
    title: 'Keep CLAUDE.md Concise',
    category: 'consensus',
    confidence: 5,
    tags: ['claude-md'],
    summary: "Boris Cherny's is ~100 lines. HumanLayer recommends under 300 (ideally 60). Instruction-following degrades linearly with instruction count. The system prompt already uses ~50 instructions, leaving limited capacity for yours.",
    sourceIds: ['boris-cherny-workflow', 'humanlayer-claude-md', 'anthropic-best-practices', 'okhlopkov-setup'],
  },
  {
    id: 'tdd-first',
    title: 'Test-Driven Development',
    category: 'consensus',
    confidence: 5,
    tags: ['testing'],
    summary: 'Have AI write tests first (TDD-style), then the minimum code to pass them. Tests act as objective validators independent of AI assertions. Prevents the trust-then-verify gap.',
    sourceIds: ['addy-osmani-agentic', 'dev-to-pitfalls', 'reddit-500k-lines', 'anthropic-best-practices', 'eesel-best-practices'],
  },
  {
    id: 'specific-prompts',
    title: 'Be Specific in Prompts',
    category: 'consensus',
    confidence: 5,
    tags: ['prompting'],
    summary: 'Reference specific files, mention constraints, point to existing patterns. Vague requests trigger broad scanning; specific requests let Claude work efficiently with minimal file reads.',
    sourceIds: ['anthropic-best-practices', 'eesel-best-practices', 'addy-osmani-agentic', 'builder-io-tips'],
  },
  {
    id: 'session-hygiene',
    title: 'Aggressive Session Hygiene',
    category: 'consensus',
    confidence: 4,
    tags: ['session', 'context'],
    summary: 'Use /clear between unrelated tasks. Use /compact to summarize long sessions. Start fresh sessions for new tasks rather than continuing one long conversation. Use /rewind to restore checkpoints.',
    sourceIds: ['anthropic-best-practices', 'boris-cherny-workflow', 'sankalp-experience', 'eesel-best-practices'],
  },
  {
    id: 'worktrees-for-parallel',
    title: 'Git Worktrees for Parallel Work',
    category: 'consensus',
    confidence: 4,
    tags: ['parallel', 'git'],
    summary: 'Each agent gets an isolated working directory via git worktrees. Prevents merge conflicts during parallel work. Claude Code has native --worktree support.',
    sourceIds: ['incident-io-worktrees', 'anthropic-best-practices', 'reddit-500k-lines', 'addy-osmani-orchestra'],
  },
  {
    id: 'subagents-for-research',
    title: 'Use Subagents to Protect Context',
    category: 'consensus',
    confidence: 4,
    tags: ['subagents', 'context'],
    summary: 'Delegate research and exploration to subagents. They run in separate context windows and report back summaries, keeping your main conversation clean for implementation.',
    sourceIds: ['anthropic-best-practices', 'sankalp-experience', 'eesel-best-practices', 'addy-osmani-orchestra'],
  },
  {
    id: 'hooks-for-guarantees',
    title: 'Use Hooks for Must-Happen Actions',
    category: 'consensus',
    confidence: 4,
    tags: ['hooks', 'automation'],
    summary: 'CLAUDE.md is advisory (~80% compliance). Hooks are deterministic (100%). Use hooks for formatting, linting, security checks, and anything that must happen every time without exception.',
    sourceIds: ['anthropic-best-practices', 'anthropic-hooks', 'humanlayer-claude-md', 'okhlopkov-setup'],
  },
  {
    id: 'monorepo-structure',
    title: 'Use Monorepos for Context Management',
    category: 'consensus',
    confidence: 3,
    tags: ['architecture', 'context'],
    summary: 'Monorepos keep related code accessible in one context. Modular routing maps frontend features to backend, minimizing context pollution. Sub-directory CLAUDE.md files provide focused context.',
    sourceIds: ['reddit-500k-lines', 'anthropic-best-practices', 'shanraisshan-best-practice'],
  },
  {
    id: 'popular-stacks',
    title: 'Use Popular Stacks and Libraries',
    category: 'consensus',
    confidence: 3,
    tags: ['architecture'],
    summary: 'LLMs make fewer mistakes with code they have seen extensively in training data. Popular frameworks (React, FastAPI, Python) with established versions produce more reliable output.',
    sourceIds: ['reddit-500k-lines'],
  },

  // === CONTESTED PRACTICES ===
  {
    id: 'autonomy-level',
    title: 'How Much Autonomy to Give Claude',
    category: 'contested',
    confidence: 3,
    tags: ['automation', 'review'],
    summary: 'How much should Claude do without human oversight? Auto mode offers a middle ground with AI-classified permission approval (0.4% false positive rate).',
    sourceIds: ['reddit-500k-lines', 'dev-to-pitfalls', 'anthropic-best-practices', 'boris-cherny-workflow', 'anthropic-auto-mode'],
    proArguments: [
      'Full bypass mode enables E2E feature implementation without interruption (Reddit 500k lines)',
      'Auto mode uses a two-stage Sonnet classifier to approve safe actions at 0.4% FPR, replacing blanket --dangerously-skip-permissions (Anthropic)',
      'Auto mode blocks 4 threat categories (destroy/exfiltrate, degrade security, cross trust boundaries, bypass review) with configurable rules',
      'Boris Cherny runs 10-15 sessions simultaneously with minimal supervision',
      'Tight feedback loops through verification (tests, linters) replace manual oversight',
    ],
    conArguments: [
      'Auto mode has 17% false-negative rate on real dangerous actions — one in six risky actions slips through (Anthropic)',
      'Claude makes silent architectural decisions that go unnoticed during review (DEV.to pitfalls)',
      'Premature implementation without discussion is a top failure mode',
      'Organizations gain real productivity only when treating AI as supervised collaborator',
      'Agents cannot commit directly; all changes should require explicit human review',
    ],
  },
  {
    id: 'claude-md-generation',
    title: 'Auto-Generate vs Hand-Craft CLAUDE.md',
    category: 'contested',
    confidence: 3,
    tags: ['claude-md'],
    summary: 'Should you use /init to auto-generate CLAUDE.md or write it manually?',
    sourceIds: ['anthropic-best-practices', 'humanlayer-claude-md', 'addy-osmani-orchestra'],
    proArguments: [
      '/init analyzes your codebase to detect build systems, test frameworks, and patterns (Anthropic)',
      'Provides a solid foundation to refine, especially for new projects',
      'Faster setup than writing from scratch',
    ],
    conArguments: [
      'Never auto-generate — it is the highest-leverage configuration point (HumanLayer)',
      'AI-written rules offer no benefit and can marginally reduce success rates (Addy Osmani)',
      'A human-curated AGENTS.md is worth more than a machine-generated one (~4% improvement vs ~3% harm)',
    ],
  },
  {
    id: 'multi-agent-value',
    title: 'Multi-Agent: Worth the Overhead?',
    category: 'contested',
    confidence: 3,
    tags: ['parallel', 'cost'],
    summary: 'Is running many parallel agents better than focused single-agent work?',
    sourceIds: ['boris-cherny-workflow', 'addy-osmani-orchestra', 'anthropic-best-practices', 'anthropic-costs'],
    proArguments: [
      '3x throughput with three agents building simultaneously (Addy Osmani)',
      'Boris Cherny runs 10-15 sessions for maximum output',
      'Each agent sees only files it owns — specialization improves quality',
      'Writer/Reviewer pattern catches bugs a single session would miss',
    ],
    conArguments: [
      'Agent teams use ~7x more tokens than standard sessions (Anthropic)',
      'Coordination overhead can eliminate throughput gains for small tasks',
      'Ambiguous requirements multiply errors across parallel runs',
      'Sweet spot is 3-5 teammates; beyond that, diminishing returns',
    ],
  },
  {
    id: 'model-selection',
    title: 'Model Selection Strategy',
    category: 'contested',
    confidence: 3,
    tags: ['cost', 'planning'],
    summary: 'Should you use Opus for everything or split between Opus (planning) and Sonnet (implementation)?',
    sourceIds: ['anthropic-costs', 'sankalp-experience', 'reddit-orchestration-prompt'],
    proArguments: [
      'opusplan mode gives Opus quality for planning + Sonnet cost for implementation (Anthropic)',
      'Opus for architecture decisions, Sonnet for code generation saves significantly',
      'Reddit orchestration prompt uses Opus for planning/review, Sonnet for implementation/tests',
    ],
    conArguments: [
      'Opus everywhere provides more consistent quality across all tasks',
      'Switching models mid-task can lose nuance from planning phase',
      'Sankalp reports Opus 4.5 is "faster, at-par in coding" — the gap is narrowing',
    ],
  },
  {
    id: 'claude-md-length',
    title: 'CLAUDE.md: 60 Lines or 300?',
    category: 'contested',
    confidence: 3,
    tags: ['claude-md'],
    summary: 'How long should CLAUDE.md actually be?',
    sourceIds: ['boris-cherny-workflow', 'humanlayer-claude-md', 'okhlopkov-setup', 'anthropic-best-practices'],
    proArguments: [
      'Boris Cherny: ~100 lines outperforms 800-line configs',
      'HumanLayer: ideally under 60 lines, never over 300',
      'okhlopkov: under 150 lines',
      'Shorter = less instruction-following degradation',
    ],
    conArguments: [
      'Complex monorepos may need more context to avoid repeated questions',
      'Progressive disclosure (linking to detail files) effectively extends length without bloat',
      'Some teams check in longer files that serve as team documentation beyond just Claude instructions',
    ],
  },

  // === ADVANCED PATTERNS ===
  {
    id: 'writer-reviewer',
    title: 'Writer/Reviewer Pattern',
    category: 'advanced',
    confidence: 5,
    tags: ['parallel', 'review'],
    summary: 'Use one Claude session to write code and a separate fresh session to review it. Fresh sessions eliminate anchoring bias, sycophancy, and context rot. HN discussion confirms independent review agents outperform same-session reviews.',
    sourceIds: ['anthropic-best-practices', 'addy-osmani-orchestra', 'boris-cherny-workflow', 'hn-code-review-discussion'],
  },
  {
    id: 'throwaway-draft',
    title: 'Throw-Away Draft Method',
    category: 'advanced',
    confidence: 3,
    tags: ['planning'],
    summary: 'For complex features, create an initial version to understand what changes are needed, then discard it and run a second iteration with sharper prompts informed by the first attempt.',
    sourceIds: ['sankalp-experience'],
  },
  {
    id: 'multi-model-review',
    title: 'Multi-Model Review',
    category: 'advanced',
    confidence: 2,
    tags: ['review'],
    summary: 'Use Opus for coding but leverage a different model (GPT, Gemini) specifically for code review and bug detection, as different models catch different classes of issues.',
    sourceIds: ['sankalp-experience'],
  },
  {
    id: 'voice-driven-dev',
    title: 'Voice-Driven Development',
    category: 'advanced',
    confidence: 2,
    tags: ['prompting'],
    summary: 'Use voice dictation (SuperWhisper, push-to-talk) to brain-dump context and requirements for 5 minutes, then tag files. Suits complex features with numerous edge cases.',
    sourceIds: ['incident-io-worktrees'],
  },
  {
    id: 'factory-model',
    title: 'The Factory Model',
    category: 'advanced',
    confidence: 3,
    tags: ['parallel', 'architecture'],
    summary: 'Six-step production line: Plan (specs + acceptance criteria) -> Spawn (assign agents) -> Monitor (check every 5-10 min) -> Verify (tests + review) -> Integrate (merge + resolve) -> Retro (update AGENTS.md).',
    sourceIds: ['addy-osmani-orchestra'],
  },
  {
    id: 'fan-out-migrations',
    title: 'Fan-Out Migrations',
    category: 'advanced',
    confidence: 3,
    tags: ['automation', 'parallel'],
    summary: 'For large migrations: generate a file list, then loop through calling `claude -p` for each file with --allowedTools to scope permissions. Test on 2-3 files, refine prompt, then run at scale.',
    sourceIds: ['anthropic-best-practices'],
  },
  {
    id: 'claude-interview',
    title: 'Let Claude Interview You',
    category: 'advanced',
    confidence: 3,
    tags: ['planning', 'prompting'],
    summary: "For larger features, ask Claude to interview you about technical implementation, UI/UX, edge cases, and tradeoffs using AskUserQuestion. Then write a SPEC.md and start a fresh session to implement.",
    sourceIds: ['anthropic-best-practices'],
  },
  {
    id: 'spec-tasks-agents-pipeline',
    title: 'SPEC -> TASKS -> AGENTS Pipeline',
    category: 'advanced',
    confidence: 3,
    tags: ['parallel', 'architecture', 'automation'],
    summary: 'Full autonomous build: SPEC.md defines requirements, TASKS.md decomposes work, AGENTS/ directory holds per-task prompts, ORCHESTRATE.sh runs them in dependency order with parallel-safe batching. Real-world case study: 14 atomic commits across 15+ files in 45 minutes with 71% context usage.',
    sourceIds: ['reddit-orchestration-prompt', 'alexop-spec-driven', 'hn-spec-driven-dev'],
  },
  {
    id: 'scheduled-agents',
    title: 'Scheduled Autonomous Agents',
    category: 'advanced',
    confidence: 3,
    tags: ['automation'],
    summary: 'Now an official feature: Routines (Week 16, April 2026) fire templated cloud agents from a schedule, a GitHub event, or an API call. Previous community approach used cron + claude -p. Example: Monday 9 AM query Sentry for worst performance issues and open GitHub PRs with fixes. Output must always be a proposal (PR, report), never a direct production action.',
    sourceIds: ['okhlopkov-setup', 'anthropic-best-practices', 'anthropic-whats-new-2026'],
  },
  {
    id: 'git-workflow-discipline',
    title: 'Git Workflow Discipline',
    category: 'advanced',
    confidence: 4,
    tags: ['git', 'review', 'automation'],
    summary: 'Enforce git hygiene via CLAUDE.md and hooks: always use feature branches (never commit to main), Conventional Commits format, atomic commits per logical change, pre-push git diff main review to catch deletions and debug code, and structured PR descriptions written for a reviewer who has no session context.',
    sourceIds: ['builtbyzac-git-workflow', 'cybernerdie-six-months', 'anthropic-best-practices'],
  },
  {
    id: 'skills-over-claude-md',
    title: 'Skills for Domain Knowledge',
    category: 'advanced',
    confidence: 4,
    tags: ['skills', 'context'],
    summary: 'Use .claude/skills/ for domain-specific knowledge that loads on demand, keeping CLAUDE.md lean. Skills contain ~200 lines of instructions, templates, and gotchas. Invocable as /skill-name.',
    sourceIds: ['anthropic-best-practices', 'okhlopkov-setup', 'shanraisshan-best-practice'],
  },

  // === FAILURE MODES ===
  {
    id: 'kitchen-sink-session',
    title: 'The Kitchen Sink Session',
    category: 'failure-mode',
    confidence: 5,
    tags: ['context', 'session'],
    summary: 'Starting with one task, asking something unrelated, then going back. Context fills with irrelevant information. Fix: /clear between unrelated tasks.',
    sourceIds: ['anthropic-best-practices'],
  },
  {
    id: 'correction-pollution',
    title: 'Repeated Correction Pollution',
    category: 'failure-mode',
    confidence: 5,
    tags: ['context', 'session'],
    summary: 'Correcting Claude over and over pollutes context with failed approaches. After two failed corrections: /clear and write a better initial prompt incorporating what you learned.',
    sourceIds: ['anthropic-best-practices', 'boris-cherny-workflow'],
  },
  {
    id: 'premature-implementation',
    title: 'Premature Implementation',
    category: 'failure-mode',
    confidence: 4,
    tags: ['planning'],
    summary: 'Claude jumps straight to coding without exploring requirements, making assumptions to deliver something. Even casual comments trigger code changes. Fix: discussion-first mode, Plan Mode.',
    sourceIds: ['dev-to-pitfalls', 'anthropic-best-practices'],
  },
  {
    id: 'silent-decisions',
    title: 'Silent Architectural Decisions',
    category: 'failure-mode',
    confidence: 4,
    tags: ['review', 'architecture'],
    summary: 'Claude makes architectural choices without surfacing them. Changes happen alongside other edits and go unnoticed during review. Fix: require explicit decision documentation.',
    sourceIds: ['dev-to-pitfalls'],
  },
  {
    id: 'futile-thrashing',
    title: 'Futile Thrashing',
    category: 'failure-mode',
    confidence: 4,
    tags: ['context', 'cost'],
    summary: 'When blocked, Claude searches exhaustively rather than asking for help. Consumes tokens attempting to solve unsolvable problems. Fix: scope investigations, use subagents.',
    sourceIds: ['dev-to-pitfalls', 'addy-osmani-orchestra'],
  },
  {
    id: 'bloated-claude-md',
    title: 'Over-Specified CLAUDE.md',
    category: 'failure-mode',
    confidence: 4,
    tags: ['claude-md'],
    summary: 'Too-long CLAUDE.md causes Claude to ignore important rules that get lost in noise. If Claude keeps doing something wrong despite a rule, the file is probably too long.',
    sourceIds: ['anthropic-best-practices', 'humanlayer-claude-md'],
  },
  {
    id: 'trust-verify-gap',
    title: 'Trust-Then-Verify Gap',
    category: 'failure-mode',
    confidence: 4,
    tags: ['testing', 'review'],
    summary: "Plausible-looking implementation that doesn't handle edge cases. Claude says things with identical confidence whether certain or guessing. Fix: always provide verification (tests, scripts, screenshots).",
    sourceIds: ['anthropic-best-practices', 'dev-to-pitfalls'],
  },
  {
    id: 'infinite-exploration',
    title: 'Infinite Exploration',
    category: 'failure-mode',
    confidence: 3,
    tags: ['context', 'subagents'],
    summary: "Asking Claude to 'investigate' without scoping it. Claude reads hundreds of files, filling context. Fix: scope investigations narrowly or use subagents.",
    sourceIds: ['anthropic-best-practices'],
  },
  {
    id: 'context-degradation',
    title: 'Context Window Degradation',
    category: 'failure-mode',
    confidence: 4,
    tags: ['context'],
    summary: 'At 70% context, precision drops. At 85%, hallucinations increase. At 90%+, responses become erratic. Claude may fabricate API versions, skip hard problems, hallucinate commit SHAs.',
    sourceIds: ['sankalp-experience', 'anthropic-best-practices'],
  },
  {
    id: 'cache-destroying-actions',
    title: 'Cache-Destroying Actions',
    category: 'failure-mode',
    confidence: 4,
    tags: ['cost', 'session'],
    summary: 'Switching models mid-session invalidates the prompt cache (caches are model-specific). Using /rewind breaks the cache on all content after the rewind point. Installing MCP servers or plugins mid-session rebuilds tool definitions, invalidating all downstream caches. Each of these forces a full cache rebuild, eliminating the 90% cost savings from cached input.',
    sourceIds: ['dev-to-cache-hits'],
  },
  {
    id: 'mcp-response-bloat',
    title: 'MCP Response Bloat',
    category: 'failure-mode',
    confidence: 3,
    tags: ['mcp', 'context', 'cost'],
    summary: 'MCP tools return 10K+ tokens per call, but users typically need ~500 tokens (5% efficiency). Without mitigation, a few MCP calls can consume 30-50% of the context window with data you never reference again. Fix: externalize responses to /tmp files and process with a dedicated Skill for 95-97% token savings.',
    sourceIds: ['medium-mcp-token-opt'],
  },
  {
    id: 'ai-code-pattern-inheritance',
    title: 'AI Code Pattern Inheritance',
    category: 'failure-mode',
    confidence: 4,
    tags: ['review', 'architecture', 'context'],
    summary: 'Claude pattern-matches against the existing codebase. If your codebase contains poor patterns (deep nesting, broad try-catch, duplicated code), those become the template for new code. The output looks plausible but is unmaintainable. Over time, the codebase loses coherence because AI code has no human intentionality to follow.',
    sourceIds: ['reddit-webdev-pr-audit', 'reddit-experienced-disconnected'],
  },
  {
    id: 'destructive-operation-guardrails',
    title: 'Destructive Operation Without Guardrails',
    category: 'failure-mode',
    confidence: 4,
    tags: ['automation', 'hooks'],
    summary: 'LLMs can misinterpret negative rules — "don\'t delete data" can be read as "delete data." --dangerously-skip-permissions removes all guardrails. Pre-tool hooks blocking rm -rf, git reset --hard, and similar commands are essential. Backups must be stored where Claude cannot reach them.',
    sourceIds: ['reddit-cc-archive-deleted', 'anthropic-hooks'],
  },
  {
    id: 'auto-mode-safety',
    title: 'Auto Mode for Supervised Autonomy',
    category: 'advanced',
    confidence: 4,
    tags: ['automation'],
    summary: 'Two-stage AI classifier (Sonnet 4.6) auto-approves safe actions and blocks four threat categories (destroy/exfiltrate, degrade security, cross trust boundaries, bypass review). 0.4% false positive rate, 17% false negative rate. Replaces --dangerously-skip-permissions with configurable environment, block rules, and allow exceptions. 3 consecutive or 20 total denials escalate to human.',
    sourceIds: ['anthropic-auto-mode'],
  },
  {
    id: 'prompt-caching-discipline',
    title: 'Prompt Caching Discipline',
    category: 'advanced',
    confidence: 4,
    tags: ['cost', 'session'],
    summary: 'Structure CLAUDE.md with static content at the top for maximum cache hits. Well-optimized sessions achieve ~90% cache hit rates and 84% input cost savings. Batch related work in one session (3.8x cheaper than separate sessions). Run /compact every 30-45 minutes. Max plan gets 1-hour cache TTL vs 5-minute for Pro/API.',
    sourceIds: ['dev-to-cache-hits', 'medium-budget-fixes', 'anthropic-costs'],
  },
  {
    id: 'spec-driven-development',
    title: 'Spec-Driven Development',
    category: 'advanced',
    confidence: 4,
    tags: ['planning', 'architecture'],
    summary: 'Four-phase workflow: parallel research (spawn subagents) → specification creation → interview refinement (AskUserQuestion to surface ambiguities) → task delegation with atomic commits. Spec serves as recovery point if a session fails. Case study: 14 atomic commits across 15+ files in 45 minutes, 71% context usage.',
    sourceIds: ['alexop-spec-driven', 'hn-spec-driven-dev', 'anthropic-webinar-advanced'],
  },
];

export function getPracticesByCategory(category: PracticeCategory): Practice[] {
  return practices.filter((p) => p.category === category);
}

export function getPracticesByTag(tag: PracticeTag): Practice[] {
  return practices.filter((p) => p.tags.includes(tag));
}

export function getHighConfidencePractices(): Practice[] {
  return practices.filter((p) => p.confidence >= 4);
}
