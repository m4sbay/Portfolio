# Project Recommendations Implementation Plan

**Goal:** Add up to four stable, title-only recommendations at the bottom of every published project detail page.

**Approved design:** Use the existing published-project auto-discovery, rank candidates by a deterministic hash of the current and candidate slugs, and render a reusable server component. No new dependencies, client state, thumbnails, or content model changes. Preserve existing local edits.

**Architecture:** `lib/project-recommendations.ts` owns exclusion, deduplication, deterministic ordering and the four-item maximum. `components/projects/ProjectRecommendations.tsx` only renders supplied projects, returning null for an empty list. `app/work/[slug]/page.tsx` supplies projects from `getPublishedProjects()`.

**Tech stack:** Existing Next.js App Router, TypeScript, Tailwind CSS and Node built-ins.

## Implementation and verification

- [x] Write `lib/project-recommendations.test.mjs` using `node:test` and run `node --test lib/project-recommendations.test.mjs` before implementation. Cover repeatability, input reordering, current-project exclusion, duplicate slugs, counts 1–6, limit handling, different seeds, input immutability and newly added candidates.
- [x] Implement `getRecommendedProjects(currentProject, allProjects, limit = 4): Project[]`. Deduplicate by slug, omit current slug, hash the JSON-encoded slug pair using SHA-256, sort ascending by hash with slug tie-break, and slice to a nonnegative integer capped at four. No mutation of input.
- [x] Create title-only semantic links under “Project lainnya”. Use two equal columns, natural wrapping, responsive padding, zinc borders, rounded cards, dark variants, hover/focus backgrounds and visible keyboard outlines. Use existing spacing and no fixed heights or extra animations.
- [x] Integrate below all optional project sections. Load the published pool once in the page and find the current project within that pool; keep metadata behavior intact.
- [x] Re-run utility tests, `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Inspect generated HTML for recommendation links and report any blocked checks accurately.

## Context

`PROJECT_CONTEXT.md` and `docs/project-playbook.md` are absent. Read the replacement `docs/superpowers/specs/2026-09-09-project-playbook-design.md`, actual data/type/page code, accessibility/performance guidance, and local Next.js docs. Public recommendations use published projects because draft detail routes return 404.

Different seeds produce different rankings, but unique sets across all pages are not guaranteed (especially with small candidate pools). Newly published files join the pool automatically on the next build.

## Verification results

- Utility tests: 6 passed (Node 26 built-in runner); observed five failing behavior tests against the empty implementation first.
- Targeted ESLint and `npx tsc --noEmit`: passed.
- `npm run build`: passed after retry with network access for Google Fonts; 51 static pages generated.
- Generated HTML: all six project pages contain four unique recommendation links, exclude themselves, have no recommendation images, and target generated detail routes.
- Browser: checked 320px and desktop two-column layouts, no recommendation overflow at 320px, visible 2px keyboard outline, and Enter navigation to iTailwind.
- Full `npm run lint`: 13 existing errors and 23 warnings outside this change (admin/footer/liquid-glass components and skill scripts). Left unrelated code untouched.
- Node prints a module-type warning when running the TypeScript utility directly; no package-level module settings changed.
