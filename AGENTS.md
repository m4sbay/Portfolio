<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project uses Next.js `16.2.4`, React `19.2.4`, Tailwind CSS `4`, and ESLint `9`.
Before changing Next.js routing, metadata, image behavior, config, caching, or server/client component boundaries, read the relevant local guide in `node_modules/next/dist/docs/`.
APIs and conventions may differ from older Next.js versions.
<!-- END:nextjs-agent-rules -->

# Masbay Portfolio Agent Guide

This file documents the actual state and conventions of this repository. Follow the codebase first, not generic portfolio templates.

## Project Overview

This is a personal portfolio for **Maulana Bayu / Masbay**. The site combines:

- a home page with animated greeting, draggable/static hero widgets, selected projects, tech marquee, product cards, testimonials, and CTA
- portfolio/project listing and detail pages under `/work`
- writing/blog pages under `/writing`
- event pages under `/event`
- services/pricing pages under `/services`
- a route-specific landing page for `/arsipreset`
- an internal liquid glass demo under `/demo/liquid-glass`

The project is content-driven. Most repeated content is modeled as typed objects in `data/`, `content/`, and `types/`, then rendered by components in `components/`.

The visual direction is clean, minimal, Apple-like, zinc-neutral, glassy, rounded, and motion-aware. The UI prefers real product/project previews, subtle borders, soft surfaces, `dark:` support, and small interactive details over large generic marketing sections.

## Tech Stack

- **Framework:** Next.js `16.2.4` with App Router.
- **React:** React `19.2.4`.
- **Language:** TypeScript strict mode.
- **Styling:** Tailwind CSS `4` through `@import "tailwindcss";` in `app/globals.css`.
- **Theme:** `next-themes` with `attribute="class"`, `defaultTheme="system"`, `disableTransitionOnChange`.
- **Animation:** `framer-motion` plus local CSS keyframes. Package `motion` is installed, but the current visible pattern is `framer-motion`.
- **Images:** `next/image` is used for project, writing, event, profile, and widget images. Some testimonial avatars still use plain `<img>` to support runtime fallback via `onError`.
- **Icons:** Local SVG components in `design-system/icons.tsx`. Use this file for icon UI before adding inline SVG.
- **Path Alias:** `@/*` maps to the repository root.
- **Validation:** `npm run lint`, `npx tsc --noEmit`, and `npm run build`.

## Project Structure

Important folders and their current purpose:

- `app/`: Next.js App Router routes, layouts, page-level metadata, dynamic route params, and global CSS.
- `app/layout.tsx`: Root HTML/body, Geist fonts, metadata defaults, providers, navbar, footer reveal wrapper, and global `max-w-6xl` main container.
- `app/providers.tsx`: Client provider boundary for `next-themes` and `LiquidGlassFilterProvider`.
- `app/page.tsx`: Home composition. It imports typed project data and composes home/project/testimonial sections.
- `components/`: Runtime UI components grouped by feature.
- `components/home/widgets/`: Hero widget system. Uses client components for mounted/interactable widgets and a static fallback to avoid hydration mismatch.
- `components/projects/`: Project cards, grids, filters, detail gallery, tags, selected work, and service rate cards.
- `components/writing/`: Writing list/detail primitives.
- `components/event/`: Event timeline and metadata rendering.
- `components/services/`: Pricing/package UI and FAQ.
- `components/arsipreset/`: Route-specific ArsiPreset UI pieces.
- `components/liquid-glass/`: SVG/filter-based liquid glass primitives.
- `components/ui/`: Reusable low-level UI such as `GlassSurface` and `ScrollToButton`.
- `components/nav/`, `components/theme/`, `components/footer/`: Site chrome.
- `content/`: Individual project, event, and writing entries.
- `data/`: Aggregators and sorted/query helpers for content arrays.
- `types/`: Shared domain types for projects, writing, events, rate cards, and stack-scroll cards.
- `lib/`: Site config and small formatting helpers.
- `design-system/`: Runtime design-system tokens, component class patterns, animations, and SVG icons.
- `skills/`: Local project skills and workflow references. Contains UI/code references (`accessibility`, `performance`, `seo`, `typescript`, `hooks`, `state-management`, `data-fetching`) plus process skills such as `brainstorming`, `writing-plans`, `systematic-debugging`, `test-driven-development`, review workflows, worktrees, subagent workflows, and skill-writing.
- `public/`: Static images and SVG assets used by cards, galleries, profile widgets, testimonials, and project pages.
- `docs/`: Project/design notes. `docs/DESIGN.md` appears aspirational and not always identical to current UI.

## Routing Architecture

This is App Router only. Use `app/**/page.tsx` and `app/**/layout.tsx`, not Pages Router.

Observed routes:

- `/`
- `/about`
- `/work`
- `/work/[slug]`
- `/writing`
- `/writing/[slug]`
- `/event`
- `/event/[slug]`
- `/services`
- `/arsipreset`
- `/demo/liquid-glass`

Dynamic routes currently use the Next 16-style async params shape:

```ts
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
}
```

Use `generateStaticParams()` for content-backed dynamic pages, as seen in `/work/[slug]`, `/writing/[slug]`, and `/event/[slug]`.

## Data And Content Pattern

Keep domain data typed and centralized.

- Project entries live in `content/projects/*.ts(x)` and export a `Project`.
- `data/projects.ts` imports those entries and controls display order.
- Writing posts live in `content/writing/posts/*.ts` and export `post`.
- `data/writing.ts` imports posts, controls order, and exposes `getPostBySlug`, `sortedWritingPosts`, and `getReadNext`.
- Events live in `content/events/*.ts`.
- `data/events.ts` imports events, sorts newest first, and exposes `getEventBySlug`.
- Home product cards live in `content/home/stack-scroll-cards.ts` and are consumed via `data/stack-scroll-cards`.
- Pricing data lives in `data/rate-card.ts`.
- Shared shapes live in `types/*.ts`.

When adding new content, update both the individual `content/...` file and the matching `data/...` aggregator. Do not hardcode repeated content into render components when a typed data file already exists.

## Coding Standards

- Prefer Server Components by default. Add `"use client"` only for hooks, event handlers, browser APIs, theme state, animations, draggable UI, or runtime measurements.
- Use named exports for components and helpers. Existing components mostly use `export function ComponentName`.
- Keep props simple inline for small components: `function X({ item }: { item: Item })`.
- Use `interface` or named `type` when props are reused, extended, or more complex.
- Use strict TypeScript patterns: optional chaining, null guards, typed unions, and no casual `any`.
- Use `@/` imports instead of deep relative imports.
- Keep helpers near the component when they are route-specific, such as `renderTextSections` and `brandLinksByProject` in `app/work/[slug]/page.tsx`.
- Extract repeated class strings to constants when the class is reused in one file, as seen in `StackedScrollSection`.
- Use `as const` for immutable token/config objects, as seen in `lib/site.ts` and `design-system/tokens.ts`.
- Existing comments are often Indonesian and explain intent around visual behavior. Keep comments short and useful.
- The codebase currently uses semicolons and double quotes.

## UI/UX Guidelines

The dominant UI language:

- neutral zinc palette with white/light surfaces and near-black dark mode
- rounded surfaces: mostly `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`
- thin borders: `border-zinc-200`, `ring-1 ring-black/5`, `dark:border-white/10`
- subtle glass: `bg-white/5`, `bg-white/10`, `backdrop-blur`, `GlassSurface`, liquid-glass components
- typography: Geist Sans through `next/font/google`; Geist Mono for timestamp/technical labels
- headings often use `tracking-tight`, `font-semibold` or `font-bold`, and fixed arbitrary sizes like `text-[36px]` or `text-[38px]`
- body text usually uses `text-zinc-600 dark:text-zinc-400` or `dark:text-zinc-300`
- section rhythm is spacious: home uses `space-y-20`; inner sections commonly use `space-y-4`, `space-y-6`, `space-y-8`, or `gap-*`
- micro labels often use uppercase with wide tracking: `text-xs font-semibold uppercase tracking-[0.14em]`

Use the existing visual primitives before inventing new ones:

- `ProjectTag` for project technology chips
- `GlassSurface` for the custom glass-card/lens effect
- `WidgetShell` and hero widget components for the home widget aesthetic
- `design-system/icons.tsx` for reusable icons
- `design-system/tokens.ts` and `design-system/animations.ts` as reference when a value needs to become reusable

## Animation Guidelines

Current animation patterns are a mix of Framer Motion and CSS.

Use this Framer pattern:

```tsx
import { LazyMotion, domAnimation, m } from "framer-motion";

<LazyMotion features={domAnimation}>
  <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
</LazyMotion>
```

Observed rules:

- Prefer `LazyMotion`, `domAnimation`, and `m` from `framer-motion` for bundle-conscious animations.
- Use `AnimatePresence` for filtered/project list transitions.
- Use `useReducedMotion()` where motion can be distracting or layout-affecting.
- Use CSS `motion-reduce:` utilities and `@media (prefers-reduced-motion: reduce)` for Tailwind/CSS keyframe animations.
- Keep hover motion subtle: scale to `1.02` or `1.05`, small translate, fade overlays, border changes.
- Clean up event listeners, intervals, ResizeObservers, and timers in `useEffect`/`useLayoutEffect`.
- The home hero widgets use mounted/static fallback logic to prevent hydration mismatch. Preserve this pattern when adding browser-dependent widget behavior.
- CSS keyframes in `app/globals.css` currently drive marquee, FAQ open, equalizer bars, bento hover track, and bundle conic border effects.

## Component Rules

- Feature components stay under their feature folder: `components/projects`, `components/writing`, `components/event`, etc.
- Shared one-off UI belongs in `components/ui`.
- Route-specific UI for ArsiPreset belongs in `components/arsipreset` or directly in `app/arsipreset/page.tsx`.
- Site chrome belongs in `components/nav`, `components/theme`, and `components/footer`.
- Keep App Router pages mostly as composition/data glue unless the render logic is specific to one route.
- Client components should be leaf-ish where possible. `app/providers.tsx` is the main global client boundary.
- For mounted-only browser behavior, render a deterministic first state, then update in `useEffect` with `queueMicrotask` when needed. This pattern appears in `Navbar`, `ThemeToggle`, `GlassSurface`, and `HeroWidgetsClient`.
- Do not move navbar glass/stacking logic casually. `Navbar` and `GlassSurface` are sensitive to z-index, SVG backdrop-filter support, real-device behavior, and hydration timing.

## Tailwind Rules

This repo uses Tailwind CSS 4 with CSS-first config in `app/globals.css`.

Follow the existing Tailwind style:

- Put most styling directly in `className`.
- Use arbitrary values when they make the design exact: `text-[38px]`, `tracking-[0.14em]`, `top-[84px]`, `max-w-[calc(100vw-2rem)]`.
- Use `dark:` variants consistently whenever adding visible surface/text/border styles.
- Prefer zinc neutrals for base UI. Use accent colors sparingly: emerald for availability/highlights, teal in services, `#6AADCE` in ArsiPreset, traffic-light colors in widget controls.
- Use responsive prefixes directly in classes: `sm:`, `md:`, `lg:`, `xl:`.
- Use `svh` for viewport-height sections where mobile browser chrome matters: `min-h-svh`, `min-h-[100svh]`.
- Use `bg-[var(--background)]` for global background integration.
- Keep text readable in both themes; common pairings are:
  - `text-zinc-950 dark:text-zinc-50`
  - `text-zinc-600 dark:text-zinc-400`
  - `border-zinc-200 dark:border-white/10`
  - `bg-white dark:bg-white/5`
- Keep class constants local when variants share a long base string.

## Responsive Rules

The project is mobile-first but keeps desktop polish.

- The root main container is `mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8`.
- Mobile layouts usually stack first, then become grids at `sm`, `md`, or `lg`.
- Use content-driven height on mobile. Avoid locking mobile sections to `h-screen` when content can grow.
- Use `min-h-svh` instead of `h-screen` for route sections that need viewport height without overlap.
- Desktop-specific sticky behavior is usually gated at `lg:` such as `lg:sticky lg:top-24`.
- The mobile navbar menu is content-width: `w-max max-w-[calc(100vw-2rem)]`.
- For image grids/cards, define aspect ratios (`aspect-4/3`, `aspect-square`) and parent `relative` wrappers before using `Image fill`.
- Keep text from colliding with controls by allowing wrapping and using `min-w-0`, `truncate`, `flex-wrap`, and `gap-*`.

## File Naming Convention

Observed naming:

- React components: `PascalCase.tsx`, e.g. `ProjectCard.tsx`, `ThemeToggle.tsx`, `GlassSurface.tsx`.
- Data/content files: mostly kebab-case for writing/events, mixed snake/camel for existing projects such as `video_vokasi.tsx` and `notion-auto-status.ts`.
- Types: domain names in `types/*.ts`, e.g. `project.ts`, `writing.ts`, `event.ts`.
- App Router files: Next conventions `page.tsx`, `layout.tsx`.
- Component functions: PascalCase named exports.
- Helper functions: camelCase.
- Constant class names/config: camelCase or uppercase for true constants, e.g. `navTextClass`, `NAVBAR_IDLE_HIDE_MS`.

When extending existing content, match the local file's naming style instead of renaming existing files.

## Reusable Pattern

Use these existing patterns:

- **Content model:** `types/X.ts` -> `content/X/*.ts` -> `data/X.ts` -> page/component renderer.
- **Dynamic metadata:** find content by slug in `generateMetadata`, return OG/Twitter metadata, and return `{}` if not found.
- **Static params:** `return items.map(item => ({ slug: item.slug }))`.
- **Image rendering:** `next/image` with either explicit `width`/`height` or `fill` inside a `relative` parent; provide `sizes` when using `fill`.
- **Client hydration guard:** static SSR-compatible output first, then mounted interactive component after `useEffect`.
- **Motion wrapper:** `LazyMotion features={domAnimation}` around `m.*`.
- **Filter UI:** local state plus `useMemo` counts/filtering, as in `SelectedWork`.
- **Fallback avatar:** derive initials from name when an image fails, as in testimonial components.
- **Brand links in project detail:** route-specific renderer maps known brand/tool names to external links.
- **Footer reveal:** root layout places `LandingFooterBeforeMain`, `main`, and `LandingFooterScrollSpace`; don't remove this structure when editing page content.

## Performance Rules

- Use Server Components unless interactivity requires a Client Component.
- Use `next/image` for new images unless there is a concrete runtime reason not to.
- Add `sizes` to every `Image fill`.
- Use `priority` only for clear above-the-fold/LCP images.
- Avoid importing full Framer Motion `motion` directly; prefer `LazyMotion`, `domAnimation`, and `m`.
- Keep browser-only APIs out of Server Components.
- Clean up global listeners and observers.
- Do not add new dependencies for small UI utilities already implemented in the repo.
- Avoid overusing `will-change`; use it only for elements that are actually animated.
- Check `skills/performance/README.ts` for local performance guidance before shipping significant UI changes.

## Things To Avoid

- Do not apply generic landing-page/portfolio templates over the existing product/content architecture.
- Do not conflate this checkout with `/Users/maulanabayu/Documents/01 Projects/masbay-portfolio`; similar files may differ.
- Do not replace App Router patterns with Pages Router patterns.
- Do not assume older Next.js params or metadata APIs; this repo uses async `params` in dynamic pages.
- Do not add `"use client"` to large route pages unless needed.
- Do not remove dark-mode variants when changing UI.
- Do not change navbar glass, `GlassSurface`, or liquid-glass fallback behavior without real validation.
- Do not use `h-screen overflow-hidden` on mobile-heavy content sections unless the existing route explicitly needs a full-screen lock.
- Do not use repo-wide lint failures as proof a touched file is broken; this repo has had unrelated lint debt before. Validate touched files when appropriate.
- Do not add broad color palettes or loud gradients to the main portfolio surface. The base style is zinc-neutral and restrained.
- Do not move content directly into components when a typed `content/` or `data/` pattern already exists.
- Do not use remote images outside `next.config.ts` `remotePatterns` unless you also update config intentionally.

## Preferred Existing Pattern

For a new project:

1. Add `content/projects/my-project.ts` exporting a `Project`.
2. Add required images to `public/projects`.
3. Import it in `data/projects.ts`.
4. Let `/work`, `/work/[slug]`, `SelectedWork`, and project cards consume it through the existing data flow.

For a new writing post:

1. Add `content/writing/posts/my-post.ts` exporting `post`.
2. Use the `WritingBlock` union from `types/writing.ts`.
3. Import it in `data/writing.ts`.
4. Let `sortedWritingPosts`, `/writing`, and `/writing/[slug]` handle display.

For a new event:

1. Add `content/events/my-event.ts`.
2. Match `CalendarEvent` from `types/event.ts`.
3. Import it in `data/events.ts`.
4. Use existing event page/timeline components.

For a new reusable visual component:

1. Search `components/` and `design-system/` first.
2. Keep it feature-local unless multiple features need it.
3. Add client boundary only when hooks/events/browser APIs are required.
4. Include `dark:` styling and responsive behavior in the first implementation.

## Workflow Notes

Common commands:

```bash
npm run dev
npm run dev:raw
npm run lint
npx eslint path/to/touched-file.tsx
npx tsc --noEmit
npm run build
```

Notes:

- `npm run dev` kills anything already listening on port `3000`, then starts `next dev --turbopack`.
- Use `npm run dev:raw` when you do not want the port-kill wrapper.
- Prefer targeted ESLint for small edits, then typecheck/build for larger cross-cutting changes.
- If changing Next.js behavior, read the matching file under `node_modules/next/dist/docs/` first.
- If adding performance, SEO, accessibility, state, hooks, or data-fetching patterns, check the local `skills/` folder before inventing new guidance.

## Local Skills Usage

This repository has a local `skills/` folder. When the user's request matches a skill, read that skill file first and follow the parts that apply to this repo and the current Codex tool environment. Some skill files use Claude/Superpowers language such as `Task`, `TodoWrite`, or `Skill`; in Codex, translate those to available tools such as `tool_search` for subagents when available, `update_plan` for task tracking, and normal file reads for local `SKILL.md` files.

Use these skills as follows:

- `skills/brainstorming/SKILL.md`: use before creative or ambiguous work such as new features, new components, behavior changes, UI redesigns, or product decisions. Explore context, ask focused questions, propose options, and get design approval before implementation. If visual exploration would help, follow its visual companion guidance.
- `skills/writing-plans/SKILL.md`: use after a spec or clear requirements exist for a multi-step task. Produce a concrete implementation plan with exact files, steps, commands, and verification. Save plans under `docs/superpowers/plans/` unless the user asks for a different location.
- `skills/executing-plans/SKILL.md`: use when the user asks to execute an existing written plan in this session. Read the plan, review it critically, execute task-by-task, and verify each step.
- `skills/subagent-driven-development/SKILL.md`: use when executing an implementation plan whose tasks are mostly independent and subagent tooling is available. Dispatch one focused implementer/reviewer flow per task; do not parallelize edits that touch shared files.
- `skills/dispatching-parallel-agents/SKILL.md`: use for 2+ independent investigations or failures that can be worked on without shared state. Keep each agent scope narrow and review results before integrating.
- `skills/systematic-debugging/SKILL.md`: use for bugs, build failures, test failures, unexpected behavior, performance problems, or integration issues. Find and verify root cause before proposing fixes.
- `skills/test-driven-development/SKILL.md`: use for feature work, bug fixes, refactors, and behavior changes where tests are practical. Write/verify a failing test first, then implement the minimum fix.
- `skills/verification-before-completion/SKILL.md`: use before claiming work is done, fixed, passing, or ready. Run fresh verification and report the actual command/result.
- `skills/requesting-code-review/SKILL.md`: use after major features, before merge, or at meaningful checkpoints when a review would reduce risk. Use available subagent/review tooling when present; otherwise do a local review pass with the same checklist.
- `skills/receiving-code-review/SKILL.md`: use when the user or an external reviewer provides review feedback. Understand and verify each item before implementing; push back with technical evidence when feedback is wrong for this codebase.
- `skills/finishing-a-development-branch/SKILL.md`: use when implementation is complete and verified, and the next step is merge, PR, keep branch, or discard. Do not clean up or delete work without explicit user choice.
- `skills/using-git-worktrees/SKILL.md`: use before larger feature work or plan execution when isolation is helpful. Detect existing worktree state first; do not create worktrees casually in this managed workspace.
- `skills/writing-skills/SKILL.md`: use when adding, editing, or validating skills under `skills/`.
- `skills/using-superpowers/SKILL.md`: treat as meta-guidance for discovering and applying the local skills, but AGENTS.md and direct user instructions still take precedence.

Project reference skills:

- `skills/accessibility/README.md`: use for focus states, ARIA, screen-reader utilities, keyboard behavior, and contrast concerns.
- `skills/performance/README.ts`: use for `next/image`, `LazyMotion`, Server/Client Component boundaries, timers, and performance-sensitive UI.
- `skills/seo/README.ts`: use for metadata, Open Graph/Twitter, robots, sitemap, and structured data.
- `skills/typescript/README.ts`: use for props typing, discriminated unions, `as const`, strict mode, utility types, and `@/` imports.
- `skills/data-fetching/README.ts`: use when adding server fetches, route handlers, polling, or API response types.
- `skills/state-management/README.ts`: use when choosing between URL state, server state, local state, refs, lifted state, context, or external libraries.
- `skills/hooks/README.ts`: use when adding reusable hooks such as media query, interval, localStorage, click outside, keypress, toggle, clipboard, or scroll tracking.

Skill priority:

1. Direct user instruction and this `AGENTS.md`.
2. Process skill for the current situation, for example brainstorming before creative work or systematic-debugging before bug fixes.
3. Domain reference skill, for example performance, SEO, accessibility, TypeScript, hooks, or state-management.
4. Existing codebase patterns.

## Important Context About This Project

- The root language is Indonesian (`<html lang="id">`), and much of the site copy is Indonesian with casual first-person tone.
- The site metadata comes from `lib/site.ts`; use that file for shared identity/social values.
- `app/globals.css` contains important route-specific and animation CSS, including ArsiPreset backgrounds, liquid glass fallback, equalizer, bento collage, bundle glow, and testimonial marquee.
- `/arsipreset/layout.tsx` intentionally escapes the root `max-w-6xl` container with full-width positioning. Do not "fix" this as accidental layout drift.
- The root footer reveal is fixed behind the main content using `.site-footer-reveal` and `--footer-height`.
- `GlassSurface` uses SVG `backdrop-filter` when supported and a plain blur fallback otherwise. Real mobile browsers may behave differently from desktop emulation.
- `design-system/` exists but not every component imports from it yet. Treat it as an available local system, not as proof the whole repo is fully tokenized.
- `docs/DESIGN.md` describes a Framer-inspired design direction, but the current implemented UI is more zinc-neutral, Apple-like, and glass-card based.
- `skills/*` files include some wording like "Next.js 14+" because they are reusable local notes; for this repo, Next.js `16.2.4` and local docs take precedence.
- Some workflow skills assume subagent tools and separate worktrees. Use them only when the current Codex environment exposes the needed capability or the user explicitly wants that workflow.

## Ambiguous Or Needs Manual Review

- The repo has both `framer-motion` and `motion` installed, but active components mostly import from `framer-motion`.
- `design-system/components.ts` and some token files may be aspirational or partially adopted; verify actual usage before enforcing them globally.
- Remaining inline `<svg>` usage in `app/` and `components/` is currently for non-icon graphics/filters such as liquid-glass SVG filters, the liquid-glass demo background, and Lightroom-style chart visuals.
- Testimonial avatars use `<img>` for fallback behavior; this is a deliberate-looking exception to the general `next/image` pattern, but it is not documented elsewhere.
- There may be pre-existing lint/style debt in unrelated files; validate the touched scope first.
