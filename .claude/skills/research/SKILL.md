---
name: research
description: Search for new Claude Code articles, blog posts, Reddit discussions, and forum threads. Compare against existing sources, extract insights, update documents, and add cross-links.
---

# Research: Find and Integrate New Claude Code Best Practices

You are conducting a research session for the Claude Code Best Practices knowledge base — an Astro/Starlight website at `src/content/docs/`.

## Step 0: Open Session

Generate a session ID in the format `session-YYYY-MM-DD`. If a session with today's date already exists in `src/data/research-log.ts`, append `-2`, `-3`, etc.

This session ID will be used when closing the session in Step 11.

Before starting, clear all `isNew` flags from the previous session: in `src/data/pages.ts`, set `isNew: false` (or remove the field) on every `PageEntry` that currently has `isNew: true`.

## Step 1: Review What We Already Have

Read `src/data/sources.ts` to understand every source already cataloged. Note the source IDs and URLs so you don't duplicate work.

Read `src/data/practices.ts` to understand every practice already documented with its confidence level and source list.

Read `src/data/research-log.ts` to understand research history:

- **Last session date** — check `getLastSessionDate()`. All searches this session MUST target content published after this date. If this is the first session, use `2025-01-01` as the baseline.
- **Recent queries** — check `getRecentQueries(3)` for queries used in the last 3 sessions. Do NOT reuse these queries. Every query this session must be meaningfully different (different core terms, different angle).
- **Deferred URLs** — check `getDeferredUrls()` for URLs flagged for re-evaluation. Prioritize these before running new searches.
- **Stale sources** — check `getStaleSources()` for sources flagged as potentially outdated. Spot-check these URLs during the session.
- **Underexplored areas** — check `getUnderexploredAreas(3)` for venue/topic combinations not covered recently. Prioritize these when constructing queries.

## Step 2: Search for New Content

This is the most important step. It defines *where* to search, *what* to search for, and *how* to avoid wasted effort.

### 2a: Re-evaluate Deferred URLs

Before running any new searches, re-visit every URL returned by `getDeferredUrls()`. Fetch each one, evaluate it, and update its status in `evaluatedUrls` to either `accepted` or `rejected`.

### 2b: Search Strategy — Venues and Topics

Each session must cover **at least 3 different venues** and **at least 3 different topic angles**, drawn from the tables below. Prioritize venue/topic combinations returned by `getUnderexploredAreas()`.

**Search Venues** (where to look):

| Venue | Tool | How to search | What it catches |
|---|---|---|---|
| General web | WebSearch | Standard web search queries | Blog posts, docs, tutorials — broadest net |
| Reddit | **Reddit MCP** (`search_reddit`, `get_top_posts`, `get_post_comments`) | Two-phase approach (see below). **Target subreddits:** `r/ClaudeAI`, `r/ChatGPTCoding`, `r/LocalLLaMA`, `r/programming`, `r/webdev`, `r/ExperiencedDevs` | Real experience reports, community consensus in high-discussion threads |
| Hacker News | WebSearch | `site:news.ycombinator.com` modifier | Tech industry reactions, deep discussion threads |
| GitHub | `gh` CLI | `gh search issues "Claude Code" --sort=created`, `gh search repos "claude-code"`. Focus on `anthropics/claude-code` issues/discussions and repos that *describe* Claude Code workflows (not random repos that happen to contain a CLAUDE.md) | Problems + solutions, workflow descriptions, community tooling |
| Dev blogs | WebSearch | `site:dev.to OR site:medium.com OR site:hashnode.dev` modifier | Longer-form developer experience writeups |
| Official Anthropic | WebSearch | `site:anthropic.com OR site:claude.ai OR site:docs.anthropic.com` modifier | Docs updates, blog posts, changelogs — highest credibility |

**Venues explicitly excluded:**
- **YouTube** — most content is derivative of forum posts; high time cost, low unique signal
- **Twitter/X** — no reliable access for search/fetch; tweets that surface in web search results are evaluated opportunistically but X is not a dedicated venue
- **Discord** — walled garden, no MCP server or API access

**Note:** The Reddit subreddit list is a living list. If you discover an active subreddit with relevant Claude Code discussion during a session, add it to this list for future sessions.

**Reddit Two-Phase Strategy:**

The gold on Reddit is in comment threads, not post titles or upvotes. Use a comment-count-driven approach:

**Phase 1: Discovery** — Use `search_reddit` and `get_top_posts` on target subreddits to find posts with **500+ comments**. These mega-threads are where experienced users debate practices, share workflows, and reach consensus. Also check previously-evaluated Reddit posts that have gained **200+ new comments** since last session (compare current comment count against `commentCount` in `evaluatedUrls`).

**Phase 2: Deep Dive** — For each qualifying post (500+ comments, or 200+ new comments), use `get_post_comments` to read the actual discussion thread. Extract:
- Practices that multiple commenters agree on
- Specific workflows with concrete results (numbers, timelines, metrics)
- Failure modes that commenters independently confirm
- Contrarian takes with strong supporting arguments

A post with 50 upvotes but 600 comments of heated debate is far more valuable than a 2000-upvote post with 30 shallow replies. Ignore upvote counts entirely — focus exclusively on comment count and comment quality.

**Topic Angles** (what to search for):

| Topic | Example terms | Maps to practice tags |
|---|---|---|
| Context & prompting | `context window`, `prompting`, `instructions` | context, prompting |
| Testing & verification | `TDD`, `testing`, `verification loops` | testing, review |
| Planning & architecture | `plan mode`, `SPEC`, `task decomposition` | planning, architecture |
| CLAUDE.md & config | `CLAUDE.md`, `configuration`, `settings` | claude-md |
| Parallel & scaling | `worktrees`, `parallel sessions`, `multi-agent`, `subagents` | parallel, subagents |
| Cost & optimization | `cost`, `tokens`, `caching`, `efficiency` | cost |
| Hooks, skills, MCP | `hooks`, `skills`, `MCP server`, `automation` | hooks, skills, mcp |
| Git & workflow | `git`, `commits`, `PR`, `code review` | git, review |
| Failure modes | `mistakes`, `pitfalls`, `problems`, `anti-patterns` | (failure-mode category) |
| New features & updates | `new feature`, `update`, `changelog`, `release` | (any) |

### 2c: Constructing Queries

Run **at least 6 searches** per session. Build queries by combining venues with topics:

1. Pick at least 3 venues and 3 topics not heavily covered in the last 3 sessions
2. For **web-based venues** (general web, HN, dev blogs, Anthropic): combine the venue's site modifier with topic terms, always including `"Claude Code"` and a date qualifier (e.g., `after:YYYY-MM-DD` based on last session date)
3. For **Reddit**: use the Reddit Two-Phase Strategy described above. Search for high-comment-count posts (500+), then deep-dive into their comment threads with `get_post_comments`
4. For **GitHub**: use `gh search issues "Claude Code" --sort=created` and `gh search repos "claude-code"` — focus on issues/discussions in `anthropics/claude-code` and repos that describe Claude Code workflows
5. At least 1 query must be a broad "what's new" sweep: `"Claude Code" new OR update OR release after:YYYY-MM-DD`
6. At least 1 query must target failure modes or problems specifically

**Query novelty check:** Each candidate query must be meaningfully different from queries in the last 3 sessions. Compare the core terms (excluding venue modifiers and date qualifiers). If substantially the same as a recent query, reformulate with different terms or a different angle before running.

**IMPORTANT — No subagent delegation:** Do NOT use the Agent tool to delegate URL fetches, Reddit lookups, or WebSearch calls. Tool permissions do not transfer to subagents, causing silent failures. All WebFetch, WebSearch, and Reddit MCP calls must run directly in the main conversation thread.

**Rate limiting:** When fetching multiple URLs from the same domain (especially `news.ycombinator.com`), add a 3-5 second `sleep` delay between requests to avoid HTTP 429 rate limiting. Batch no more than 3 fetches from the same domain per search round. If a fetch returns 429, stop fetching from that domain for the rest of the session and note the URL as deferred.

### 2d: URL Dedup During Search

For each result URL:
1. **Skip PDF URLs** — URLs ending in `.pdf` or returning `Content-Type: application/pdf` cannot be reliably parsed across platforms. If a PDF appears important, note it in session notes as a gap but do not attempt to fetch or process it.
2. Normalize with `normalizeUrl()` (strips query params, fragments, trailing slashes)
3. Check `getUrlStatus(url)` from `research-log.ts`:
   - **accepted** → skip (already a source)
   - **rejected < 90 days ago** → skip
   - **rejected >= 90 days ago** → re-evaluate (content may have been updated)
   - **deferred** → should have been handled in Step 2a
   - **undefined** → new URL — fetch, evaluate, and add to `evaluatedUrls` with status and reason

For each search, scan the results. For new sources, fetch the page and extract:
- Key claims or practices
- Whether they confirm, contradict, or extend existing documented practices
- Any data points, statistics, or quantitative claims
- The author's credibility and context

### 2e: Staleness Spot-Check

Pick the 3 sources in `stalenessTracker` with the oldest `lastVerified` dates. Re-fetch their URLs and verify the content is still current. Update `lastVerified` and set `contentStale` to `true` if the content has materially changed or the page returns an error.

## Step 3: Classify Findings

For each new finding, determine:

1. **Does it confirm an existing practice?** → Increase confidence, add source reference
2. **Does it contradict an existing practice?** → Add to contested-practices or note the disagreement
3. **Is it a new practice not yet documented?** → Determine which page it belongs on
4. **Is it a new failure mode?** → Add to failure-modes
5. **Is it a new tool, plugin, or resource?** → Note for templates or guides

## Step 4: Update the Data Layer

Update `src/data/sources.ts`:
- Add new sources with id, title, author, url, date, type, credibility rating, and summary
- Update the `getSourceById` and `getSourcesByType` helper functions if needed

Update `src/data/practices.ts`:
- For confirmed practices: add the new source ID to `sourceIds`, potentially increase `confidence`
- For new practices: add a full entry with id, title, category, confidence, tags, summary, sourceIds
- For contested items: add or update `proArguments` / `conArguments`

## Step 5: Update Content Pages

For each affected MDX page in `src/content/docs/research/`:

1. If updating an existing section inside a `<div id="...">`:
   - Add new evidence, quotes, or data points to the relevant subsection
   - Add the new source attribution inline
   - Update the `<ContentPanels>` item description if the summary has meaningfully changed

2. If adding a new section:
   - Add a new `<div id="new-id">` wrapper with the full writeup
   - Add a corresponding entry to the `<ContentPanels items={[...]}>`  array
   - Follow the existing format: What It Is, Why It Works, How to Implement It, Common Mistakes

3. If updating guides or templates:
   - Only update if the new information is actionable (not just confirming what's there)
   - Add cross-links to relevant research pages

## Step 6: Cross-Link Documents

After making updates, scan for cross-linking opportunities:

- When a research page mentions a concept that has a guide, link to the guide
- When a guide references a practice, link to the research page
- When a template page mentions a concept, link to the relevant guide or research
- Use standard markdown links: `[Guide: Writing CLAUDE.md](/guides/claude-md-guide/)`

## Step 7: Update the Homepage

If new high-confidence findings change the "Key Findings at a Glance" section on `src/content/docs/index.mdx`, update it.

## Step 8: Voice Pass on New Content

Before building, rewrite all **newly generated** content in the user's voice using the MCP voice server at theducktower.org. Do NOT rewrite existing content that was already on the page — only the text added during this session.

For each block of new content (new sections, new panel descriptions, new writeups):

1. Call `mcp__voice__retrieve_voice_style_context` with the raw draft text as the `prompt` parameter. Pass the unedited draft — do not paraphrase or summarize it before sending.
2. Read the returned style context carefully.
3. Rewrite the draft following the voice guidance so the new content sounds like the user, not like AI.
4. Replace the draft in the file with the rewritten version.

Skip this step for structured data updates (`sources.ts`, `practices.ts`, `research-log.ts`) — voice only applies to prose content in MDX pages.

## Step 9: Build and Verify

Run `npm run build` to verify all pages compile without errors. Fix any MDX issues (common: unescaped curly braces, nested code fences needing 4 backticks).

## Step 10: Close Session

Update `src/data/research-log.ts` with the results of this session:

1. **Add a new `ResearchSession` entry** to the `sessions` array with:
   - The session ID from Step 0
   - Today's date
   - All queries run (with venue, topic, result counts, and new URLs found)
   - `venuesCovered` and `topicsCovered` arrays
   - Counts of URLs evaluated, accepted, rejected, deferred
   - IDs of all sources and practices added or updated
   - Session notes including: gaps to explore next time, promising leads, and any patterns noticed

2. **Update `evaluatedUrls`** with all new entries from this session. For URLs that appeared in search results but were already tracked, update their `lastSeen` date.

3. **Update `stalenessTracker`** with the results of any staleness checks from Step 2e.

4. **Mark updated pages as new** in `src/data/pages.ts`: for every page that received new content this session (new sections, updated panels, new data), set `isNew: true` on its `PageEntry`. Also update the page's `description` if counts have changed (e.g., "11 failure modes" → "13 failure modes"). This ensures the homepage PanelGrid shows "NEW" badges on recently updated pages.

## Step 11: Report

Summarize what you found:
- How many new sources discovered
- How many existing practices had confidence updated
- Any new practices or failure modes added
- Any existing contested practices that shifted
- Cross-links added
- Queries that were reformulated due to overlap with recent sessions
- Stale sources detected during spot-checks
- Venues and topics covered this session, and which remain underexplored
- Any gaps that remain for next session

## Rules

- **Never remove existing content** — only add, update, or annotate
- **Always cite sources** — every claim must link to a source
- **Preserve the panel structure** — if adding sections to paneled pages, add both the `<div>` wrapper AND the `<ContentPanels>` item entry
- **Use 4-backtick fences** (````) for code blocks that contain nested triple-backtick code
- **Escape curly braces** in MDX content outside code blocks: `\{` and `\}`
- **Date everything** — use the current date for new panel items
- **Be skeptical** — a single blog post claiming something doesn't make it consensus. Weight official docs and multi-source confirmation heavily
- **Always normalize URLs** — use `normalizeUrl()` before comparing or storing URLs
- **Track everything** — every URL evaluated must be recorded in `evaluatedUrls`, whether accepted, rejected, or deferred
- **Content must teach** — every new section added to a content page must teach the reader how to improve their use of Claude Code. If a finding is interesting but not actionable (e.g., a product announcement without workflow implications), note it in the session log but do not add it as a content section
