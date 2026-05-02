---
name: voice-pass
description: Rewrites existing course content in the user's voice using the voice MCP server. Run this once to backfill content written before voice was integrated, or on specific files passed as arguments.
---

# Voice Pass: Rewrite Course Content in the User's Voice

Rewrite course prose to sound like the user instead of AI-generated documentation.

## Scope

If arguments are provided (`$ARGUMENTS`), treat them as a space-separated list of file paths or course slugs (e.g., `101 102` or `src/content/docs/201/plan-mode.mdx`). Only process those files.

If no arguments are provided, process every lesson file across all courses:
- `src/content/docs/101/*.mdx`
- `src/content/docs/102/*.mdx`
- `src/content/docs/201/*.mdx`
- `src/content/docs/202/*.mdx`
- `src/content/docs/300/*.mdx`
- And any other numbered course directories that exist

Do NOT touch:
- `src/content/docs/research/` — research docs have their own voice pass in the research skill
- `src/content/docs/templates/` — these are templates, not prose
- `src/content/docs/guides/` — legacy guides, leave untouched unless explicitly passed as an argument

---

## Process (per file)

For each file in scope:

### 1. Read the file

Identify all prose blocks — paragraphs, list item descriptions, exercise task descriptions, and success criteria wording.

Skip:
- Frontmatter (the `---` block at the top)
- Code blocks (anything inside `` ``` ``)
- Inline code (anything inside `` ` ``)
- MDX component tags and attributes (`<Exercise title="...">` — leave the title attribute as-is)
- Table headers (the `|---|` separator rows)
- Section headings (`##`, `###`) — leave these as-is, they're structural

### 2. Call the voice MCP

Call `mcp__voice__retrieve_voice_style_context` once per file, passing the entire prose content of the file as the `prompt` parameter (excluding the elements listed above).

Read the returned style guidance fully before rewriting anything.

### 3. Rewrite the prose

Apply the style guidance to every prose block in the file. The goal is for the content to sound like the user wrote it — not like documentation, not like an AI assistant explaining something, not like a textbook.

Common AI-prose patterns to eliminate:
- Overly formal transitions ("Furthermore", "Moreover", "It is important to note that")
- Hedge phrases ("It's worth mentioning", "You may find that")
- Explaining what you're about to explain ("In this section, we will cover...")
- Passive voice when active is natural
- Padding ("the fact that", "in order to", "at this point in time")

### 4. Preserve structure exactly

Do not:
- Rename headings
- Reorder sections
- Add or remove sections
- Change code blocks
- Change the Exercise component structure

Do:
- Rewrite all paragraph prose
- Rewrite table cell content (not headers)
- Rewrite exercise task descriptions and success criteria

### 5. Write the file

Write the rewritten version back to the same file path. The structure, frontmatter, code, and components stay identical — only the prose changes.

---

## After All Files

Run `npm run build` to confirm no MDX errors were introduced. Fix any issues before reporting done.

---

## Report

When complete, list:
- Files rewritten
- Any files skipped and why
- Any build errors encountered and how they were resolved

---

## Rules

- **One MCP call per file** — don't batch multiple files into one call, the style context is most accurate when focused on one file's content at a time
- **Never change meaning** — the rewrite changes voice, not content. Facts, steps, and success criteria stay accurate
- **Never shorten for the sake of it** — if the user's voice is more direct, that's fine, but don't cut content just to make it shorter
- **If the voice MCP returns an error**, skip that file, note it in the report, and continue with the rest
