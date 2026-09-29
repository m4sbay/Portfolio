# Project Card Metadata Implementation Plan

**Goal:** Apply the approved restrained card hierarchy: image, title, output/year, description, technology tags.
**Architecture:** Typed optional output with a category fallback; year remains source data. Existing card layout and effects remain intact.
**Stack:** Existing Next.js, React, Tailwind and TypeScript; no new dependencies.

- [x] Add `PROJECT_OUTPUTS`, `ProjectOutput`, and optional `output` in `types/project.ts`; centralize category fallback in `lib/project-metadata.ts`.
- [x] Fill confirmed years (GRS 2026, iTailwind 2025, Notion 2026, Vokasi 2026). Set specific outputs for Plugin, Poster, Banner, Template, and Social Media Design in their content files.
- [x] Update `components/projects/ProjectCard.tsx`: metadata `mt-1 text-xs`, description `mt-3 text-sm leading-normal`, remove description flex growth and fixed minimum content height, tags `mt-auto pt-4`, retain `p-4`. Preserve image sizing, hover and grid behavior.
- [x] Run targeted ESLint, `npx tsc --noEmit`, and `npm run build`. Review rendered cards at mobile/tablet/desktop widths if browser access is available, with short/long content and both themes.
- [x] Review diff for unintended changes, preserve pre-existing content/asset edits, and report validation results.

Verification: targeted ESLint, TypeScript and diff whitespace checks passed. Browser checked all nine cards at 390, 768 and 1280px: 14px/21px descriptions, no card overflow; mobile dark mode checked. Removed grid auto-rows-fr after visual review to avoid stretching every row to the tallest card. Production build attempted twice: first blocked by Google Fonts connectivity, then by Turbopack internal DM Sans font resolution in app/speaking/layout.tsx. Build remains unverified.
