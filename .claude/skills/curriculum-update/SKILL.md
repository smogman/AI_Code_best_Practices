---
name: curriculum-update
description: Reads all research findings and makes curriculum promotion decisions — update an existing course, create a new specialized course at a determined level, or leave as reference-only.
---

# Curriculum Update: Promote Research into Courses

You are reviewing the research knowledge base and deciding what belongs in the curriculum.

The curriculum uses a level-number system where the number communicates both difficulty and position in the learning journey:
- **1xx** — Beginner (no prior Claude Code knowledge required)
- **2xx** — Intermediate (actively using Claude Code on real projects)
- **3xx** — Advanced (daily use, comfortable with all intermediate features)

Within each range, the specific number communicates sequencing and specialization. `101`, `102` are the core beginner courses. `120` would be a specialized beginner topic. `215` sits between two existing intermediate courses. `308` is an advanced specialization. You assign the number that best reflects prerequisites and where the topic fits in someone's learning journey.

---

## Step 1: Read the Existing Curriculum

Read every existing course overview file to understand what's already covered:

- `src/content/docs/101/index.mdx`
- `src/content/docs/102/index.mdx`
- `src/content/docs/201/index.mdx`
- `src/content/docs/202/index.mdx`
- `src/content/docs/300/index.mdx`

Also scan the lesson files inside each course directory to know the full scope of current coverage. You need this map before making any promotion decisions.

Then read `astro.config.mjs` to understand the current sidebar structure.

---

## Step 2: Read All Research

Read every file in the research and raw notes directories:

- All files in `src/content/docs/research/`
- All files in `src/content/docs/raw-notes/`

For each file, extract the discrete findings — individual practices, patterns, failure modes, or concepts. A single research file may contain 5–15 distinct findings.

---

## Step 3: Make Promotion Decisions

For each finding, assign one of three verdicts and document your reasoning:

### Verdict A — Update Existing Course
The finding adds meaningful depth, a concrete data point, nuance, or a correction to a lesson that already exists. It is not substantial enough for its own course.

**Criteria:**
- The existing lesson covers the same concept but would be materially improved by this finding
- The finding is 1–3 paragraphs worth of content, not a full lesson
- Adding it would not make the existing lesson bloated (> ~600 lines)

### Verdict B — New Course
The finding (or cluster of related findings) is substantial enough to stand alone as a course with its own lessons and exercises. It is not well-served by being folded into an existing course.

**Criteria:**
- Distinct enough that it warrants its own learning objective
- Deep enough to support at least 2–3 lessons with exercises
- Supported by multiple research sources (confidence 3+) OR directly from the Claude Code creator or official docs
- Not already covered by any existing course

**When assigning the level number:**
- Ask: what must someone already know before taking this course?
- If prerequisites are only 101/102, place in the 1xx range
- If prerequisites include active project use and Plan Mode, place in 2xx
- If prerequisites include daily use and 202-level features, place in 3xx
- Within the range, pick a number that reflects where it sits relative to existing courses. Leave gaps — don't number every course consecutively. A course that's a specialization off `102` might be `115` or `120`. A course that bridges `201` and `202` might be `210`.
- Check if the number already exists in the sidebar. If it does, increment by 5 or 10.

### Verdict C — Reference Only
The finding belongs in the reference docs but should never become a course. It stays where it is.

**Criteria (any one is sufficient):**
- Interesting data or statistics without a clear actionable workflow
- Already thoroughly covered in an existing course
- Too niche or situational to apply broadly (< 20% of users would ever use it)
- A product announcement or feature description with no workflow implications
- A finding that is genuinely contested with no consensus — note it in research, don't teach it as a course

---

## Step 4: Produce a Classification Report

Before making any file changes, write out the full classification report in this format:

```
## Classification Report

### Verdict B — New Courses
- [Finding name] → Course [number]: [proposed title]
  Why: [1-2 sentence reasoning]
  Prerequisites: [what learner needs to know]
  Lessons planned: [2-4 bullet points]

### Verdict A — Updates to Existing Courses  
- [Finding name] → [existing course slug]/[lesson slug]
  Why: [1-2 sentence reasoning]
  Addition: [1-2 sentences on what gets added]

### Verdict C — Reference Only
- [Finding name]
  Why: [1-2 sentence reasoning]
```

**Stop here and wait for user approval before proceeding.** The user may want to override any verdict, adjust a level number, or split/merge proposed courses. Do not write any files until the user says to proceed.

---

## Step 5: Implement Approved Decisions

After the user approves (with any modifications), implement in this order:

### For each Verdict A (Update Existing):

1. Open the target lesson file
2. Find the appropriate section to add the content
3. Add the new content, citing the source from the research docs with a markdown link
4. Keep the lesson's existing structure and voice

### For each Verdict B (New Course):

1. Create `src/content/docs/[level]/index.mdx` — course overview with:
   - Title: `"[level]: [Course Title]"`
   - Description
   - Lessons list with links
   - Prerequisites
   - What you'll be able to do

2. Create each lesson file at `src/content/docs/[level]/[lesson-slug].mdx` using this structure:
   - Frontmatter with title and description
   - Import Exercise component: `import Exercise from '../../../components/Exercise.astro';`
   - Concept explanation grounded in the research findings (cite sources)
   - Practical how-to
   - `<Exercise>` block at the end with a concrete task and 4–5 pass/fail success criteria

3. Add the course to the sidebar in `astro.config.mjs` — insert it in level-number order within the correct range

4. Do NOT add new courses to `src/data/pages.ts` yet — the homepage course grid is managed separately

### For each Verdict C (Reference Only):
No file changes needed. The finding already lives in the research docs.

---

## Step 6: Voice Pass

Before building, rewrite all **newly written or newly updated** prose in the user's voice using the voice MCP server. Do NOT touch existing lesson content that was already there before this session.

For each new or updated lesson file:

1. Call `mcp__voice__retrieve_voice_style_context` with the raw draft prose as the `prompt` parameter. Pass the unedited text — do not summarize or paraphrase it first.
2. Read the returned style guidance carefully.
3. Rewrite the prose following that guidance so it sounds like the user, not like AI-generated documentation.
4. Replace the draft in the file with the rewritten version.

Skip this step for:
- Frontmatter (title, description fields)
- Code blocks and inline code
- The `<Exercise>` component structure itself (keep the format)
- `astro.config.mjs` sidebar entries

Apply it to:
- All paragraph prose in new lesson files
- Any new paragraphs added to existing lessons
- Exercise task descriptions and success criteria wording

---

## Step 7: Build Verification

Run `npm run build` and fix any errors before reporting done.

---

## Step 7: Report

Summarize:
- New courses created (with level numbers and lesson count)
- Existing courses updated (which lessons, what was added)
- Findings left as reference-only (count and brief reason)
- Any findings you were uncertain about and why

---

## Rules

- **Never remove existing content** — only add or extend
- **Ground everything in the research** — every claim in a new lesson must trace back to a finding in the research docs. If you're writing from general knowledge, flag it explicitly
- **Exercises must be testable** — success criteria must be pass/fail, not subjective. "Claude follows your conventions" is not testable. "Claude uses camelCase in the new function without being told" is
- **Level numbers communicate prerequisites** — a learner should be able to look at the number and understand roughly where it fits before reading the description
- **Don't over-promote** — a single source finding with no corroboration should almost never become a course. Courses teach consensus, not experiments
- **Cite the research** — when a lesson claims something, link to the relevant research page so learners can go deeper
