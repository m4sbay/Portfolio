# UI Writing Specification

Version: 1.1.0

Last Updated: 2026-07-09

Source of truth: the current implementation of the article "Work From Ruang" and every component it renders.

This document describes the UI design language of the Writing pages. It is a design specification, not an implementation guide. It intentionally contains no CSS classes or values. Behavior rules (entity registry, first-mention rule, placement rules, reporting) live in `docs/writing-space.md`.

Every new Writing component must follow this document.

---

## Philosophy

Purpose

Define the mindset behind every visual decision on Writing pages.

Design Rules

- Typography is the hero. Components exist to support reading, never to compete with it.
- The page must never feel like a landing page. It is an article first.
- Surfaces are calm and flat. Decoration is expressed through hairline borders and whitespace, not shadows or color.
- Every visual element earns its place. When in doubt, use plain text.

---

## Design Language

Purpose

Describe the shared visual vocabulary all Writing components draw from.

Design Rules

- Neutral zinc palette. Light mode uses white surfaces with near-black text; dark mode uses near-black surfaces with translucent white panels.
- Blue is reserved exclusively for hyperlinks and Rich Mentions. No other accent color appears in article UI.
- Muted grays carry body text; near-black/near-white is reserved for headings and titles.
- Borders are always thin and low-contrast (light gray in light mode, faint white in dark mode).
- Every visible surface, text, and border defines both a light and a dark appearance.

---

## Typography

Purpose

Define the type hierarchy of an article page.

Visual Structure

Article title → meta line → section headings → body paragraphs → supporting labels.

Design Rules

- Article title: very large (roughly double body size), semibold, tight letter spacing, tight line height, near-black.
- Meta line (date · topic · reading time): small, muted gray, sits directly under the title, separated by middle dots.
- Section headings: clearly larger and heavier than body text, semibold, tight letter spacing, near-black in light mode and near-white in dark mode.
- Body paragraphs: slightly larger than standard UI text for comfortable long-form reading, generous line height, normal weight, muted gray — noticeably softer than headings.
- Micro labels (sidebar section titles): very small, semibold, uppercase, wide letter spacing, muted gray.
- Card titles in grids: small, single line, truncated with ellipsis so all cards stay uniform.

---

## Layout System

Purpose

Define the page-level structure of the article detail page.

Visual Structure

1. Breadcrumb
2. Article header (title + meta line)
3. Cover image
4. Article body
5. Related-articles section (full width)

Design Rules

- On large screens the page is two columns: the article takes the flexible main column; a fixed-width sidebar sits on the right.
- The sidebar becomes sticky on large screens, offset below the navbar.
- The related-articles section sits below the two-column area and spans the full content width, without the sidebar.
- The page inherits the site-wide centered content container; Writing never escapes it.

Responsive Behavior

- Below large screens the columns stack: article first, sidebar below it.
- Column gaps are generous and grow slightly on large screens.

---

## Vertical Rhythm

Purpose

Keep spacing between article blocks consistent and predictable.

Design Rules

- All article blocks (paragraphs, headings, cards) share one consistent vertical gap.
- Section headings add extra space above themselves, so a new section visually detaches from the previous one.
- The Entity Card receives slightly more breathing room than paragraphs.
- The cover image is separated from the header and from the body by larger-than-paragraph gaps.
- The related-articles section is separated from the article by a large section-level gap.

---

## Spacing Rules

Purpose

Define how padding and gaps behave inside components.

Design Rules

- Cards and panels use generous, even inner padding; padding grows slightly on wider screens.
- Icon-to-text gaps are compact — enough to separate, never enough to disconnect.
- Grids use one uniform gap in both directions.
- Space is always reserved for hover-revealed elements so nothing shifts layout when it appears.

---

## Border & Radius

Purpose

Define how edges look across Writing UI.

Design Rules

- Borders are hairline-thin and low-contrast everywhere; no element uses a heavy or colored border.
- Radius scale, from smallest to largest:
  - small radius: Entity Card container, buttons, icon containers, badge chips
  - medium radius: grid preview boxes, sidebar panels
  - large radius: Entity Card preview image
  - very large radius: article cover image
- A child may use a larger radius than its parent (the Entity Card preview is rounder than the card itself).
- Logos use slightly rounded corners with a very subtle hairline outline so white logos never bleed into white surfaces.

---

## Shadow

Purpose

Define elevation.

Design Rules

- Writing surfaces are flat. No shadows on cards, panels, buttons, or images.
- Depth is communicated through borders and background contrast only.

---

## Buttons

Purpose

Define button styling, currently represented by the Entity Card's "Visit Website" button.

Design Rules

- Solid, high-contrast fill: dark surface with light text in light mode, inverted (light surface, dark text) in dark mode.
- Small size, compact horizontal padding, small radius.
- Plain text label — no arrow, no icon.
- Hairline border matching the neutral border language.

Interaction

- Subtle background color transition on hover. No movement, no shadow.

---

## Links

Purpose

Define how links appear inside Writing pages.

Design Rules

- Article body text never contains plain inline hyperlinks; external references use Rich Mentions instead.
- Breadcrumb links are muted gray, darkening to near-black (or near-white in dark mode) on hover.
- Whole cards can act as links (writing grid cards); they show no underline and rely on hover reveals for affordance.
- All external links open in a new tab.

---

## Rich Mention

Purpose

Inline reference to an external entity, shown at the entity's first appearance inside a paragraph.

Visual Structure

Two separate elements flowing inline with the paragraph text:

1. A small bordered icon container.
2. The entity name as a blue hyperlink, outside the container.

Design Rules

- Icon container: small square slightly taller than the text's x-height, hairline gray border, white background (translucent white in dark mode), small radius, icon centered inside with its own slightly rounded corners.
- Only the icon container has a border and background. The text never does.
- Entity name: blue, medium weight, same size as the surrounding paragraph text.
- The name shares the exact same baseline as the paragraph text. Any vertical fine-tuning is applied to the icon container only — never to the mention as a whole.
- Icon and name are separated by a compact gap and must never break onto separate lines.

Interaction

- Hover: the icon container's background tints subtly; the text color does not change; cursor becomes pointer.
- Click: opens the entity's official website in a new tab.

---

## Entity Card

Purpose

A static information panel summarizing an entity, placed after the article finishes discussing it, immediately before the next heading.

Visual Structure

Left: preview image.

Right, top row: logo + (title stacked above subtitle), with the Visit Website button at the far right.

Right, below: short description.

Design Rules

- Container: hairline gray border, small radius, flat white surface (translucent white in dark mode), no shadow, generous inner padding.
- Preview image: sits inside the card padding with its own rounded corners (larger radius than the card); it never bleeds to the card edges.
- Logo: belongs to the heading group, not floating. It visually matches the combined height of title + subtitle, uses slightly rounded corners and a hairline outline.
- Title: base size, semibold, tight tracking, near-black; truncates on one line.
- Subtitle: small, muted gray, sits directly under the title; truncates on one line.
- Description: small, relaxed line height, muted gray, concise — the card stays compact.
- Button: follows the Buttons section; anchored to the top-right of the content area.

Interaction

- The card itself is static: no hover lift, no shadow, no motion. Only the button reacts to hover.

Responsive Behavior

- Narrow screens: vertical stack — preview on top as a wide banner (roughly 16:9), content below.
- Wider screens: horizontal layout — preview takes a fixed width on the left and stretches to fill the card height proportionally; content fills the remaining width.

---

## Image Rules

Purpose

Define how images behave across Writing UI.

Design Rules

- Cover image: spans the article column, 4:3 aspect ratio, very large radius, cropped to fill.
- All images are cover-cropped inside their frames; frames define the shape, never the image.
- Every image frame has a neutral placeholder background so unloaded or missing images don't flash white/black.
- Grid preview images live inside fixed-height frames — the card decides the image size, not the other way around.
- Logos are always small, square-cropped, with subtle rounding and a hairline ring.

---

## Writing Card (Grid Item)

Purpose

The card used in writing grids, including the "Lainnya seperti ini" section under each article.

Visual Structure

1. Header: title (one truncated line) with the date in smaller muted text underneath.
2. Preview box: the only bordered element — fixed height, medium radius, image filling it.
3. Footer: topic label on the left, diagonal arrow icon on the right.

Design Rules

- The card container itself is invisible: no border, background, or shadow; the whole card is one click target.
- The footer always occupies its space so hover reveals never shift the layout.

Interaction

- Hovering the card fades the preview image into an information panel: a solid surface showing a reading-time chip (hairline border, small radius) and a centered multi-line excerpt, capped at three lines.
- The footer fades in on hover on larger screens.
- All reveals are opacity-based, quick, and ease-out; nothing moves or resizes.

Responsive Behavior

- The footer is always visible on touch/mobile widths, hover-revealed from small screens up.
- Grid: one column on mobile, two on small screens, three on large screens, with one uniform gap.

---

## Section Action Link ("Baca Selengkapnya")

Purpose

Text link under a topic grid on the Writing home, leading to that topic's category page.

Visual Structure

A single small text link below the grid, left-aligned.

Design Rules

- Plain text link — no border, background, icon, or underline.
- Small, muted gray; darkens to near-black (near-white in dark mode) on hover, color transition only.
- Appears only when the grid hides cards at the current breakpoint: more than 2 posts on mobile, more than 4 on small screens, more than 6 on large screens.
- Label: "Baca Selengkapnya".

Interaction

- Navigates to `/writing/<topic-slug>`. Hover changes color only; nothing moves.

---

## Category Page

Purpose

Page listing every published article of one topic at `/writing/<topic-slug>`, plus cross-topic recommendations.

Visual Structure

1. Breadcrumb (Writing → topic name)
2. Header: topic name + article count
3. Grid of all published articles in the topic (no pagination)
4. "Lainnya Seperti Ini" section (max 6 published articles from other topics)

Design Rules

- Header mirrors the article detail header: very large semibold title with tight tracking, and the count underneath in the small muted meta style (e.g. "7 tulisan").
- The grid reuses the Writing Card and the standard grid (one uniform gap, entrance animation).
- Empty state (topic has no published articles): a single muted body-text paragraph — "Belum ada tulisan di topik ini." No box, no illustration, no icon.
- "Lainnya Seperti Ini" follows the same section shell as other writing grids (section heading + grid) and is hidden entirely when there is nothing to recommend.
- The page inherits the site-wide centered content container; there is no sidebar.

Responsive Behavior

- Grid follows the standard writing grid columns (one column on mobile, two on small screens, three on large screens).
- No cards are breakpoint-hidden here — the category page always shows every published article of the topic.

---

## Sidebar

Purpose

Right-hand column of the article detail page, used for promo/info slots.

Visual Structure

Stacked panels, each with a micro label on top and its content below.

Design Rules

- Panels: hairline border, medium radius, even inner padding, no background fill, no shadow.
- Micro labels follow the Typography section's micro-label style.
- Panel content is small, muted, relaxed line height.

Responsive Behavior

- Sticky below the navbar on large screens only; below that it stacks under the article.

---

## Responsive Rules

Purpose

Shared responsive principles for all Writing components.

Design Rules

- Mobile-first: components stack vertically first and gain horizontal layouts at wider breakpoints.
- Content height is never locked on mobile; sections grow with their content.
- Text must never collide with controls: long titles truncate, flexible areas may shrink, wrapping is allowed where truncation isn't used.
- Aspect ratios are declared for image frames on narrow layouts; on wide layouts frames may instead stretch to match sibling content height.

---

## Motion & Transition

Purpose

Define how Writing UI moves.

Design Rules

- Motion is scarce and quiet. Reading is never interrupted by animation.
- Hover feedback is color/opacity only — brief, ease-out transitions. No scaling, lifting, or shadow changes.
- Grid entrance: cards rise slightly and fade in with a short stagger, triggered once when the grid scrolls into view.
- Static components (Entity Card, sidebar panels, article body) have no motion at all.
- All animation must respect reduced-motion preferences: transitions and entrance effects are disabled for users who opt out.

---

## Future Components

Purpose

Rules for extending this document when new article components are added (Video Embed, Code Block, Quote, Gallery, Timeline, Callout, Reference List, ...).

Design Rules

- Add one new self-contained section per component. Never modify existing sections to accommodate a new one.
- Every new section must document: Purpose, Visual Structure, Design Rules, Interaction, and Responsive Behavior (when relevant).
- New components must reuse the vocabulary defined above: hairline borders, the established radius scale, flat surfaces, zinc palette, muted body text, blue reserved for links, opacity-based interaction, reserved hover space, and dual light/dark styling.
- When a new component needs a visual treatment this document doesn't cover yet, extend the relevant foundation section (Typography, Border & Radius, Motion, ...) instead of inventing a one-off rule inside the component section.
