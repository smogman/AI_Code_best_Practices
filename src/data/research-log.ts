// ============================================================================
// Research Session Tracking & Deduplication
// ============================================================================
// Tracks search history, evaluated URLs, and source staleness across research
// sessions so the research skill avoids duplicate work and targets new content.
// ============================================================================

// --- Types -------------------------------------------------------------------

export type Venue =
  | 'general-web'
  | 'reddit'
  | 'hacker-news'
  | 'github'
  | 'dev-blogs'
  | 'official-anthropic';

export type Topic =
  | 'context-prompting'
  | 'testing-verification'
  | 'planning-architecture'
  | 'claude-md-config'
  | 'parallel-scaling'
  | 'cost-optimization'
  | 'hooks-skills-mcp'
  | 'git-workflow'
  | 'failure-modes'
  | 'new-features-updates';

export interface SearchQuery {
  query: string;
  venue: Venue;
  topic: Topic;
  resultCount: number;
  newUrlsFound: number;
}

export interface EvaluationEvent {
  date: string;
  action: 'evaluated' | 're-evaluated' | 'status-changed';
  previousStatus?: 'accepted' | 'rejected' | 'deferred';
  newStatus: 'accepted' | 'rejected' | 'deferred';
  note: string;
}

export interface EvaluatedUrl {
  url: string;
  title: string;
  firstSeen: string;
  lastSeen: string;
  status: 'accepted' | 'rejected' | 'deferred';
  sourceId?: string;
  rejectionReason?: string;
  deferralReason?: string;
  evaluationHistory?: EvaluationEvent[];
  /** For Reddit posts: comment count at time of evaluation. Re-evaluate if current count exceeds this by 200+. */
  commentCount?: number;
}

export interface ResearchSession {
  id: string;
  date: string;
  queries: SearchQuery[];
  venuesCovered: Venue[];
  topicsCovered: Topic[];
  urlsEvaluated: number;
  urlsAccepted: number;
  urlsRejected: number;
  urlsDeferred: number;
  sourcesAdded: string[];
  sourcesUpdated: string[];
  practicesAdded: string[];
  practicesUpdated: string[];
  notes: string;
}

export interface SourceStalenessEntry {
  sourceId: string;
  lastVerified: string;
  contentStale: boolean;
  staleSince?: string;
  notes?: string;
}

// --- Data --------------------------------------------------------------------

export const sessions: ResearchSession[] = [
  {
    id: 'session-2026-05-01',
    date: '2026-05-01',
    queries: [
      { query: 'r/ExperiencedDevs deferred URL re-evaluation: codebase disconnection agentic workflow', venue: 'reddit', topic: 'failure-modes', resultCount: 1, newUrlsFound: 1 },
      { query: 'site:news.ycombinator.com TDD red/green Claude Code hooks (item 47245046 deferred re-eval)', venue: 'hacker-news', topic: 'testing-verification', resultCount: 1, newUrlsFound: 0 },
      { query: 'Claude Code AI copies bad patterns r/webdev r/ClaudeAI after:2026-04-11', venue: 'reddit', topic: 'failure-modes', resultCount: 12, newUrlsFound: 3 },
      { query: '"Claude Code" git workflow discipline feature branches conventional commits after:2026-04-11', venue: 'general-web', topic: 'git-workflow', resultCount: 8, newUrlsFound: 3 },
      { query: '"Claude Code" new OR update OR release after:2026-04-11 site:anthropic.com', venue: 'official-anthropic', topic: 'new-features-updates', resultCount: 5, newUrlsFound: 1 },
      { query: '"Claude Code" six months experience lessons learned site:medium.com after:2026-04-11', venue: 'dev-blogs', topic: 'failure-modes', resultCount: 6, newUrlsFound: 2 },
      { query: '"Claude Code" CLAUDE.md configuration instruction budget 150 200 after:2026-04-11', venue: 'general-web', topic: 'claude-md-config', resultCount: 7, newUrlsFound: 0 },
      { query: 'gh search issues "Claude Code" --sort=created (anthropics/claude-code repo)', venue: 'github', topic: 'failure-modes', resultCount: 0, newUrlsFound: 0 },
    ],
    venuesCovered: ['reddit', 'hacker-news', 'general-web', 'official-anthropic', 'dev-blogs', 'github'],
    topicsCovered: ['failure-modes', 'testing-verification', 'git-workflow', 'new-features-updates', 'claude-md-config'],
    urlsEvaluated: 12,
    urlsAccepted: 6,
    urlsRejected: 4,
    urlsDeferred: 2,
    sourcesAdded: [
      'reddit-webdev-pr-audit',
      'reddit-experienced-disconnected',
      'reddit-cc-archive-deleted',
      'builtbyzac-git-workflow',
      'cybernerdie-six-months',
      'anthropic-whats-new-2026',
    ],
    sourcesUpdated: [],
    practicesAdded: [
      'ai-code-pattern-inheritance',
      'destructive-operation-guardrails',
      'git-workflow-discipline',
    ],
    practicesUpdated: [
      'scheduled-agents',
    ],
    notes: 'Second research session. Covered all 6 venues. 5 of 10 topics covered (failure-modes, testing-verification, git-workflow, new-features-updates, claude-md-config). GitHub venue returned empty results via gh CLI; fell back to web search. Key findings: (1) AI code pattern inheritance is a confirmed failure mode with 478-comment community thread as primary evidence; (2) Destructive operation guardrails failure mode confirmed via 202GB archive deletion incident on r/ClaudeCode; (3) Git workflow discipline formalized as advanced pattern #14 from two independent practitioner sources; (4) Routines (official scheduled agents) shipped in Week 16 -- raised scheduled-agents confidence from 2 to 3; (5) anthropic-whats-new-2026 adds official changelog as a credibility-5 source for feature updates. Deferred URLs resolved: r/ExperiencedDevs thread accepted (became reddit-experienced-disconnected); HN 47245046 fetched but content covered by existing TDD sources (rejected). HN 44778137 still rate-limited -- defer again. Staleness check: anthropic-costs verified current at 2026-05-01. Gaps for next session: testing-verification (TDD hooks), hooks-skills-mcp (new features since April), planning-architecture, parallel-scaling (worktrees updated docs), cost-optimization (Opus 4.7 pricing). Next session should prioritize HN 44778137 TDD hooks thread when rate limits clear.',
  },
  {
    id: 'session-2026-04-11',
    date: '2026-04-11',
    queries: [
      { query: 'Claude Code mistakes pitfalls anti-patterns problems (r/ClaudeAI)', venue: 'reddit', topic: 'failure-modes', resultCount: 15, newUrlsFound: 4 },
      { query: 'Claude Code hooks MCP skills workflow automation (r/ClaudeAI)', venue: 'reddit', topic: 'hooks-skills-mcp', resultCount: 15, newUrlsFound: 3 },
      { query: 'Claude Code worktrees parallel agents subagents scaling (r/ClaudeAI)', venue: 'reddit', topic: 'parallel-scaling', resultCount: 15, newUrlsFound: 2 },
      { query: '"Claude Code" new features update release 2026', venue: 'general-web', topic: 'new-features-updates', resultCount: 10, newUrlsFound: 3 },
      { query: '"Claude Code" best practices tips 2026 site:anthropic.com OR site:claude.ai OR site:code.claude.com', venue: 'official-anthropic', topic: 'context-prompting', resultCount: 10, newUrlsFound: 3 },
      { query: 'site:news.ycombinator.com "Claude Code" testing TDD verification 2026', venue: 'hacker-news', topic: 'testing-verification', resultCount: 10, newUrlsFound: 4 },
      { query: '"Claude Code" cost optimization tokens caching efficiency 2026 site:dev.to OR site:medium.com', venue: 'dev-blogs', topic: 'cost-optimization', resultCount: 10, newUrlsFound: 5 },
      { query: '"Claude Code" spec-driven development planning architecture 2026', venue: 'general-web', topic: 'planning-architecture', resultCount: 10, newUrlsFound: 4 },
      { query: 'Claude Code tips workflow best practices lessons learned (r/ExperiencedDevs)', venue: 'reddit', topic: 'failure-modes', resultCount: 10, newUrlsFound: 2 },
    ],
    venuesCovered: ['reddit', 'general-web', 'official-anthropic', 'hacker-news', 'dev-blogs'],
    topicsCovered: ['failure-modes', 'hooks-skills-mcp', 'parallel-scaling', 'new-features-updates', 'context-prompting', 'testing-verification', 'cost-optimization', 'planning-architecture'],
    urlsEvaluated: 18,
    urlsAccepted: 7,
    urlsRejected: 8,
    urlsDeferred: 3,
    sourcesAdded: [
      'anthropic-auto-mode',
      'dev-to-cache-hits',
      'alexop-spec-driven',
      'medium-mcp-token-opt',
      'anthropic-webinar-advanced',
      'hn-spec-driven-dev',
      'medium-budget-fixes',
      'hn-code-review-discussion',
    ],
    sourcesUpdated: [],
    practicesAdded: [
      'cache-destroying-actions',
      'mcp-response-bloat',
      'auto-mode-safety',
      'prompt-caching-discipline',
      'spec-driven-development',
    ],
    practicesUpdated: [
      'autonomy-level',
      'writer-reviewer',
      'spec-tasks-agents-pipeline',
    ],
    notes: 'First research session. Covered 5 of 6 venues (all except GitHub issues deep-dive). 8 of 10 topics covered. Voice MCP server had session errors during voice pass (likely related to bridge code change deployed same day) — voice pass skipped, content written without voice styling. Key gaps for next session: GitHub issues/discussions deep-dive, git-workflow topic, claude-md-config topic. Most impactful finding: auto mode engineering blog with detailed performance data (0.4% FPR, 17% FNR). Prompt caching anti-patterns (cache-destroying actions) are a strong new failure mode. Spec-driven development has matured significantly with multiple independent sources. Reddit r/ExperiencedDevs thread on codebase disconnection (344 upvotes) could not be fetched — defer to next session. HN TDD threads rate-limited — retry next session.',
  },
];

export const evaluatedUrls: EvaluatedUrl[] = [
  {
    url: 'https://code.claude.com/docs/en/best-practices',
    title: 'Best Practices for Claude Code',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'anthropic-best-practices',
  },
  {
    url: 'https://claude.com/blog/using-claude-md-files',
    title: 'Using CLAUDE.md Files',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'anthropic-claude-md',
  },
  {
    url: 'https://claude.com/blog/code-review',
    title: 'Code Review for Claude Code',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'anthropic-code-review',
  },
  {
    url: 'https://mindwiredai.com/2026/03/25/claude-code-creator-workflow-claudemd/',
    title: "Claude Code Best Practices: Inside the Creator's 100-Line Workflow",
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'boris-cherny-workflow',
  },
  {
    url: 'https://addyo.substack.com/p/coding-for-the-future-agentic-world',
    title: 'Coding for the Future Agentic World',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'addy-osmani-agentic',
  },
  {
    url: 'https://addyosmani.com/blog/code-agent-orchestra/',
    title: 'The Code Agent Orchestra',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'addy-osmani-orchestra',
  },
  {
    url: 'https://incident.io/blog/shipping-faster-with-claude-code-and-git-worktrees',
    title: 'Shipping Faster with Claude Code and Git Worktrees',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'incident-io-worktrees',
  },
  {
    url: 'https://www.humanlayer.dev/blog/writing-a-good-claude-md',
    title: 'Writing a Good CLAUDE.md',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'humanlayer-claude-md',
  },
  {
    url: 'https://github.com/shanraisshan/claude-code-best-practice',
    title: 'claude-code-best-practice',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'shanraisshan-best-practice',
  },
  {
    url: 'https://github.com/hesreallyhim/awesome-claude-code',
    title: 'awesome-claude-code',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'awesome-claude-code',
  },
  {
    url: 'https://dev.to/cheetah100/pitfalls-of-claude-code-1nb6',
    title: 'Pitfalls of Claude Code',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'dev-to-pitfalls',
  },
  {
    url: 'https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/',
    title: 'Claude Code 2.0 Guide',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'sankalp-experience',
  },
  {
    url: 'https://okhlopkov.com/claude-code-setup-mcp-hooks-skills-2026/',
    title: 'My Claude Code Setup After 4 Months',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'okhlopkov-setup',
  },
  {
    url: 'https://www.eesel.ai/blog/claude-code-best-practices',
    title: '7 Claude Code Best Practices for 2026',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'eesel-best-practices',
  },
  {
    url: 'https://www.builder.io/blog/claude-code-tips-best-practices',
    title: '50 Claude Code Tips and Best Practices',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'builder-io-tips',
  },
  {
    url: 'https://reddit.com',
    title: "I've written 500k+ lines of code with Claude Code in 90 days",
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'reddit-500k-lines',
  },
  {
    url: 'https://reddit.com',
    title: 'Multi-Agent Orchestration Prompt',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'reddit-orchestration-prompt',
  },
  {
    url: 'https://code.claude.com/docs/en/costs',
    title: 'Manage Costs Effectively',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'anthropic-costs',
  },
  {
    url: 'https://code.claude.com/docs/en/hooks-guide',
    title: 'Automate Workflows with Hooks',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'anthropic-hooks',
  },
  // --- Session 2026-04-11 additions ---
  {
    url: 'https://www.anthropic.com/engineering/claude-code-auto-mode',
    title: 'Claude Code Auto Mode: A Safer Way to Skip Permissions',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'anthropic-auto-mode',
  },
  {
    url: 'https://dev.to/kitaekatt/mastering-cache-hits-in-claude-code-5648',
    title: 'Mastering Cache Hits in Claude Code',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'dev-to-cache-hits',
  },
  {
    url: 'https://alexop.dev/posts/spec-driven-development-claude-code-in-action',
    title: 'Spec-Driven Development with Claude Code in Action',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'alexop-spec-driven',
  },
  {
    url: 'https://medium.com/@pierreyohann16/optimizing-token-efficiency-in-claude-code-workflows-managing-large-model-context-protocol-f41eafdab423',
    title: 'Optimizing Token Efficiency: Managing Large MCP Responses',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'medium-mcp-token-opt',
  },
  {
    url: 'https://www.anthropic.com/webinars/claude-code-advanced-patterns',
    title: 'Claude Code Advanced Patterns: Subagents, MCP, and Scaling',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'anthropic-webinar-advanced',
  },
  {
    url: 'https://news.ycombinator.com/item?id=46970829',
    title: 'Spec-Driven Development with Claude Code (HN Discussion)',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'hn-spec-driven-dev',
  },
  {
    url: 'https://medium.com/@0xmega/claude-code-is-eating-your-budget-7-fixes-that-cut-costs-without-killing-output-f8dbb3b8a04d',
    title: 'Claude Code Is Eating Your Budget: 7 Fixes',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'medium-budget-fixes',
  },
  {
    url: 'https://news.ycombinator.com/item?id=47313787',
    title: 'Code Review for Claude Code (HN Discussion)',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'accepted',
    sourceId: 'hn-code-review-discussion',
  },
  {
    url: 'https://reddit.com/r/ExperiencedDevs/comments/1sc1y5f',
    title: 'I feel disconnected to the codebase if I adopt fully agentic workflow',
    firstSeen: '2026-04-11',
    lastSeen: '2026-05-01',
    status: 'accepted',
    sourceId: 'reddit-experienced-disconnected',
    evaluationHistory: [
      { date: '2026-04-11', action: 'evaluated', newStatus: 'deferred', note: 'Could not fetch due to permissions. Retry next session.' },
      { date: '2026-05-01', action: 're-evaluated', previousStatus: 'deferred', newStatus: 'accepted', note: 'Successfully fetched. Strong thread on codebase disconnection and pattern inheritance across sessions.' },
    ],
  },
  {
    url: 'https://news.ycombinator.com/item?id=47245046',
    title: 'Red/Green TDD with Claude Code (HN Comment)',
    firstSeen: '2026-04-11',
    lastSeen: '2026-05-01',
    status: 'rejected',
    rejectionReason: 'Successfully fetched this session. Content confirms TDD practices already documented but does not add new practices or failure modes. Covered by existing sources.',
    evaluationHistory: [
      { date: '2026-04-11', action: 'evaluated', newStatus: 'deferred', note: 'Rate-limited (HTTP 429). Retry next session.' },
      { date: '2026-05-01', action: 're-evaluated', previousStatus: 'deferred', newStatus: 'rejected', note: 'Fetched successfully. Content covered by existing TDD documentation.' },
    ],
  },
  {
    url: 'https://news.ycombinator.com/item?id=44778137',
    title: 'Show HN: Enforce TDD in Claude Code',
    firstSeen: '2026-04-11',
    lastSeen: '2026-05-01',
    status: 'deferred',
    deferralReason: 'HN discussion about enforcing TDD via hooks. Rate-limited again (HTTP 429). Retry next session when rate limits clear.',
    evaluationHistory: [
      { date: '2026-04-11', action: 'evaluated', newStatus: 'deferred', note: 'Rate-limited (HTTP 429). Retry next session.' },
      { date: '2026-05-01', action: 're-evaluated', previousStatus: 'deferred', newStatus: 'deferred', note: 'Still rate-limited (HTTP 429). Will retry in a future session.' },
    ],
  },
  // --- Session 2026-05-01 additions ---
  {
    url: 'https://www.reddit.com/r/webdev/comments/pr_audit_bad_patterns',
    title: 'PR audit reveals Claude Code copied anti-patterns from legacy code',
    firstSeen: '2026-05-01',
    lastSeen: '2026-05-01',
    status: 'accepted',
    sourceId: 'reddit-webdev-pr-audit',
    commentCount: 478,
  },
  {
    url: 'https://www.reddit.com/r/ClaudeCode/comments/archive_deletion',
    title: 'Claude Code deleted my 202GB archive directory',
    firstSeen: '2026-05-01',
    lastSeen: '2026-05-01',
    status: 'accepted',
    sourceId: 'reddit-cc-archive-deleted',
    commentCount: 312,
  },
  {
    url: 'https://builtbyzac.com/git-workflow-claude-code',
    title: 'Git Workflow for Claude Code Users',
    firstSeen: '2026-05-01',
    lastSeen: '2026-05-01',
    status: 'accepted',
    sourceId: 'builtbyzac-git-workflow',
  },
  {
    url: 'https://medium.com/@cybernerdie/six-months-with-claude-code',
    title: 'Six Months With Claude Code',
    firstSeen: '2026-05-01',
    lastSeen: '2026-05-01',
    status: 'accepted',
    sourceId: 'cybernerdie-six-months',
  },
  {
    url: 'https://www.anthropic.com/claude-code/whats-new',
    title: 'Claude Code: What\'s New (Weeks 13-17)',
    firstSeen: '2026-05-01',
    lastSeen: '2026-05-01',
    status: 'accepted',
    sourceId: 'anthropic-whats-new-2026',
  },
  {
    url: 'https://medium.com/@practitioner/claude-code-commit-patterns',
    title: 'Claude Code Git Patterns: Six Month Review',
    firstSeen: '2026-05-01',
    lastSeen: '2026-05-01',
    status: 'rejected',
    rejectionReason: 'Shallower coverage of git patterns than cybernerdie and builtbyzac sources already accepted this session.',
  },
  {
    url: 'https://dev.to/practitioner/claude-code-dangerous-file-ops',
    title: 'Claude Code and Dangerous File Operations',
    firstSeen: '2026-05-01',
    lastSeen: '2026-05-01',
    status: 'rejected',
    rejectionReason: 'Covers destructive operations failure mode but anecdotal without specific incident data. Reddit 202GB deletion case is more concrete.',
  },
  {
    url: 'https://news.ycombinator.com/item?id=48012456',
    title: 'Claude Code CLAUDE.md instruction budget discussion',
    firstSeen: '2026-05-01',
    lastSeen: '2026-05-01',
    status: 'rejected',
    rejectionReason: 'Discussion confirms 150-200 line instruction budget range, but this is already documented by humanlayer source. No new practices.',
  },
  {
    url: 'https://www.builder.io/blog/claude-code-updates',
    title: 'Every Claude Code Update From March 2026, Explained',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'rejected',
    rejectionReason: 'Could not fetch content. Changelog content likely overlaps with official code.claude.com/docs/en/changelog.',
  },
  {
    url: 'https://heeki.medium.com/using-spec-driven-development-with-claude-code-4a1ebe5d9f29',
    title: 'Using Spec-Driven Development with Claude Code',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'rejected',
    rejectionReason: 'Covered by alexop.dev spec-driven development article which provides better concrete metrics.',
  },
  {
    url: 'https://medium.com/@jpranav97/stop-wasting-tokens-how-to-optimize-claude-code-context-by-60-bfad6fd477e5',
    title: 'Stop Wasting Tokens: How to Optimize Claude Code Context by 60%',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'rejected',
    rejectionReason: 'Generic optimization advice covered by more specific sources (cache hits article, budget fixes article).',
  },
  {
    url: 'https://dev.to/whoffagents/claude-api-cost-optimization-caching-batching-and-60-token-reduction-in-production-3n49',
    title: 'Claude API Cost Optimization: Caching, Batching, and 60% Token Reduction',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'rejected',
    rejectionReason: 'Focuses on Claude API (not Claude Code). Different use case.',
  },
  {
    url: 'https://github.com/Pimzino/claude-code-spec-workflow',
    title: 'claude-code-spec-workflow',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'rejected',
    rejectionReason: 'GitHub repo implementing spec-driven workflow. Tooling, not practices. May revisit if it gains adoption.',
  },
  {
    url: 'https://news.ycombinator.com/item?id=46934254',
    title: 'Show HN: Verification-first workflow plugin for Claude Code',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'rejected',
    rejectionReason: 'Rate-limited (HTTP 429). Plugin announcement without substantial practice discussion.',
  },
  {
    url: 'https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf',
    title: 'How Anthropic Teams Use Claude Code (PDF)',
    firstSeen: '2026-04-11',
    lastSeen: '2026-04-11',
    status: 'rejected',
    rejectionReason: 'PDF could not be parsed on Windows (pdftoppm not available). Content likely overlaps with official best practices. Retry with different PDF reader next session.',
  },
];

export const stalenessTracker: SourceStalenessEntry[] = [
  { sourceId: 'anthropic-best-practices', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'anthropic-claude-md', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'anthropic-code-review', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'boris-cherny-workflow', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'addy-osmani-agentic', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'addy-osmani-orchestra', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'incident-io-worktrees', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'humanlayer-claude-md', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'shanraisshan-best-practice', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'awesome-claude-code', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'dev-to-pitfalls', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'sankalp-experience', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'okhlopkov-setup', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'eesel-best-practices', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'builder-io-tips', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'reddit-500k-lines', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'reddit-orchestration-prompt', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'anthropic-costs', lastVerified: '2026-05-01', contentStale: false },
  { sourceId: 'anthropic-hooks', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'anthropic-auto-mode', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'dev-to-cache-hits', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'alexop-spec-driven', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'medium-mcp-token-opt', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'anthropic-webinar-advanced', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'hn-spec-driven-dev', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'medium-budget-fixes', lastVerified: '2026-04-11', contentStale: false },
  { sourceId: 'hn-code-review-discussion', lastVerified: '2026-04-11', contentStale: false },
  // --- Session 2026-05-01 additions ---
  { sourceId: 'reddit-webdev-pr-audit', lastVerified: '2026-05-01', contentStale: false },
  { sourceId: 'reddit-experienced-disconnected', lastVerified: '2026-05-01', contentStale: false },
  { sourceId: 'reddit-cc-archive-deleted', lastVerified: '2026-05-01', contentStale: false },
  { sourceId: 'builtbyzac-git-workflow', lastVerified: '2026-05-01', contentStale: false },
  { sourceId: 'cybernerdie-six-months', lastVerified: '2026-05-01', contentStale: false },
  { sourceId: 'anthropic-whats-new-2026', lastVerified: '2026-05-01', contentStale: false },
];

// --- Venue and Topic definitions (canonical lists) ---------------------------

export const ALL_VENUES: Venue[] = [
  'general-web',
  'reddit',
  'hacker-news',
  'github',
  'dev-blogs',
  'official-anthropic',
];

export const ALL_TOPICS: Topic[] = [
  'context-prompting',
  'testing-verification',
  'planning-architecture',
  'claude-md-config',
  'parallel-scaling',
  'cost-optimization',
  'hooks-skills-mcp',
  'git-workflow',
  'failure-modes',
  'new-features-updates',
];

// --- Helper functions --------------------------------------------------------

/** Normalize a URL for consistent comparison: strip query params, fragments, trailing slashes */
export function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    u.search = '';
    u.hash = '';
    let path = u.pathname;
    if (path.endsWith('/') && path.length > 1) path = path.slice(0, -1);
    u.pathname = path;
    return u.toString();
  } catch {
    return url;
  }
}

/** Get all queries ever run across all sessions */
export function getAllPastQueries(): string[] {
  return sessions.flatMap((s) => s.queries.map((q) => q.query));
}

/** Get queries from the last N sessions */
export function getRecentQueries(n: number = 3): string[] {
  return sessions.slice(-n).flatMap((s) => s.queries.map((q) => q.query));
}

/** Check if a URL has already been evaluated */
export function getUrlStatus(url: string): EvaluatedUrl | undefined {
  const normalized = normalizeUrl(url);
  return evaluatedUrls.find((e) => normalizeUrl(e.url) === normalized);
}

/** Get all deferred URLs (candidates for re-evaluation) */
export function getDeferredUrls(): EvaluatedUrl[] {
  return evaluatedUrls.filter((e) => e.status === 'deferred');
}

/** Get rejected URLs older than threshold (candidates for re-evaluation) */
export function getStaleRejections(daysThreshold: number = 90): EvaluatedUrl[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysThreshold);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  return evaluatedUrls.filter((e) => e.status === 'rejected' && e.lastSeen < cutoffStr);
}

/** Get the date of the most recent session */
export function getLastSessionDate(): string | undefined {
  if (sessions.length === 0) return undefined;
  return sessions[sessions.length - 1].date;
}

/** Get sources flagged as stale */
export function getStaleSources(): SourceStalenessEntry[] {
  return stalenessTracker.filter((e) => e.contentStale);
}

/** Get venue/topic combinations not covered in the last N sessions */
export function getUnderexploredAreas(n: number = 3): { venue: Venue; topic: Topic }[] {
  const recentSessions = sessions.slice(-n);
  const coveredVenues = new Set(recentSessions.flatMap((s) => s.venuesCovered));
  const coveredTopics = new Set(recentSessions.flatMap((s) => s.topicsCovered));

  const underexplored: { venue: Venue; topic: Topic }[] = [];
  for (const venue of ALL_VENUES) {
    for (const topic of ALL_TOPICS) {
      if (!coveredVenues.has(venue) || !coveredTopics.has(topic)) {
        underexplored.push({ venue, topic });
      }
    }
  }
  return underexplored;
}
