# Writing Specification

Version: 1.3.0

Last Updated: 2026-07-09

---

# Purpose

This document is the single source of truth for every Writing page in this portfolio.

Whenever Claude Code creates or edits an article, every implementation MUST follow this specification unless I explicitly instruct otherwise.

The objective is to create articles that feel modern, elegant, interactive, and enjoyable to read while maintaining a minimal visual language.

The article itself should always remain the primary focus.

The article "Work From Ruang" is the current visual reference for every Writing page.

---

# Core Principles

Writing pages should never feel like walls of text.

Visual components should only appear when they genuinely improve readability or provide additional context.

Every new component must be:

- reusable
- data-driven
- responsive
- maintainable
- lightweight
- visually consistent

Never duplicate UI or data.

Never hardcode entity information inside components.

Follow the existing design system.

Do not redesign the Writing page unless explicitly instructed.

---

# Post Status & Topic Registry

## Status

Every post declares a required `status` field.

v1 values:

- `published` — rendered on the website
- `draft` — exists in the repo, never rendered anywhere (home, category, detail, recommendations, static params)

The `WritingStatus` union in `types/writing.ts` is designed to be extended later with `scheduled` and `archived`. When that happens, extend the union and centralize the visibility check in one data-layer function.

All status filtering happens automatically inside `data/writing.ts`. Pages and components never filter by status themselves.

## Topic Registry

Topics live in one centralized registry: `WRITING_TOPICS` in `types/writing.ts`, each entry `{ slug, label }`.

- A post's `topic` is typed against the registry labels — a typo fails compilation.
- Adding a category = adding one entry to `WRITING_TOPICS`. Its page at `/writing/<topic-slug>` becomes available automatically, including the empty state when it has no published posts yet.
- Never hardcode topic names or category routes anywhere else.

---

# Auto-Discovery

Posts are discovered automatically from `content/writing/posts/`.

Adding an article requires exactly ONE step:

1. Create one file in `content/writing/posts/` exporting `post: WritingPost` with its metadata, `status`, and `topic`.

No other file needs to change. There is no manual import list.

Rules:

- The `slug` field on the post object is the single source of truth for the URL. The filename is free.
- A file in `posts/` that does not export a valid `post` (with `slug` and `status`) fails the build with the filename in the error message.
- Duplicate slugs, and post slugs that collide with a topic slug, also fail the build.
- New posts require a rebuild to appear in production (the site is fully static).

---

# Rich Mention System

## Purpose

When an article references an external entity that deserves additional context, the first appearance should become a Rich Mention.

Examples of entities include:

- applications
- software
- AI tools
- frameworks
- libraries
- APIs
- programming languages
- companies
- products
- organizations
- services
- websites
- books
- platforms
- technologies

The system must remain generic and future-proof.

---

## First Mention Rule

Only the FIRST appearance of an entity should become a Rich Mention.

Every following mention must remain plain text unless explicitly instructed otherwise.

---

## Component

Example

```tsx
<RichMention entity="notion" />
```

The component must retrieve all information from the Entity Registry.

Never hardcode:

- title
- icon
- website

inside the component.

---

# Rich Mention Layout

Rich Mention consists of TWO separate visual elements.

NOT one single badge.

Correct layout:

┌─────┐ Notion
│logo │
└─────┘

The icon and text are visually separated.

---

## Icon

The icon should be displayed inside its own container.

Requirements

- small square
- subtle gray border
- white background
- small border radius
- centered icon
- consistent spacing

Only the icon has a border.

---

## Text

The entity name should:

- sit outside the bordered icon
- appear as a blue hyperlink
- align vertically with the icon
- use the same size as surrounding text with a slightly heavier (medium) weight
- never have its own border
- never appear inside the bordered container

---

## Baseline Alignment

The hyperlink text must share the exact same baseline as the surrounding paragraph text.

Any vertical adjustment belongs to the icon container only.

Never shift the whole mention vertically.

The icon and the entity name must never break into separate lines.

---

## Interaction

Hover

- subtle background transition on the icon container only
- text color remains unchanged
- cursor pointer

Click

Open the official website in a new tab.

---

# Entity Card

## Purpose

Whenever an article finishes discussing an entity, display an Entity Card before the next heading.

The card provides additional context.

Never insert it inside paragraphs.

Never place it after the next heading.

Always place it immediately before the next heading.

---

## Component

```tsx
<EntityCard entity="notion" />
```

The component automatically reads all information from the Entity Registry.

---

# Entity Card Layout

Structure

---

Preview Image

Logo  Title                  Visit Website
      Subtitle

Description

---

---

## Left Section

Contains

- preview image

The preview image should:

- maintain aspect ratio
- have its own rounded corners, independent from the card corners
- sit inside the card padding, not bleed to the card edges
- fill the available height proportionally on wide layouts
- sit above the content as a wide banner on narrow layouts

---

## Right Section

The right side consists of three areas.

Top

Logo + Title + Subtitle

Middle

Description

Top Right

Visit Website button

---

# Logo Layout Rule

The logo is NOT positioned independently.

Instead, it belongs to the heading group.

Correct hierarchy

Logo

↓

Title

Subtitle

The logo should visually align with the combined height of the title and subtitle.

The logo uses slightly rounded corners with a very subtle outline.

Use Flexbox.

Avoid placing the logo floating separately.

---

# Visit Website Button

Always positioned at the top-right.

Requirements

- solid, high-contrast button (dark surface in light mode, light surface in dark mode)
- small size
- small border radius
- plain label without arrow or icon
- consistent spacing

---

# Description

Use approximately 2–3 short paragraphs or a concise description.

Avoid long text.

The card should remain compact.

---

# Card Styling

Requirements

- thin gray border
- small border radius
- flat surface: no shadow
- no hover lift; the card is static
- generous inner spacing
- responsive
- minimal

The preview image may use a larger radius than the card itself.

The card should feel like a calm, premium information panel.

---

# Entity Registry

Every entity must live inside a centralized registry.

Example

entities/

notion.ts

react.ts

openai.ts

vercel.ts

ruang-tambah.ts

...

Each entity should expose data similar to

```ts
{
  (slug, title, subtitle, description, website, logo, preview);
}
```

RichMention and EntityCard must consume this registry.

Never duplicate entity information.

---

# Placeholder Assets

If assets are unavailable,

Claude Code MUST use placeholders.

Example

/public/placeholders/notion-logo.svg

/public/placeholders/notion-preview.png

Do not invent assets.

Do not generate temporary graphics.

Simply reference placeholder paths.

---

# Asset Reporting

Whenever placeholders are used,

Claude Code MUST report them after implementation.

Example

## Placeholder Assets

Entity

Notion

Logo

/public/placeholders/notion-logo.svg

Preview

/public/placeholders/notion-preview.png

This allows manual replacement later.

---

# Article Writing Rules

Articles should read naturally.

Avoid excessive visual components.

Rich Mention

Only once per entity.

Entity Card

Only once per entity.

The article should still feel like reading an article, not browsing a landing page.

---

# Article Typography

Body paragraphs

- slightly larger than standard UI text for comfortable long-form reading
- generous line height
- muted gray foreground, softer than headings

Section headings

- clearly larger and heavier than body text
- tight letter spacing
- near-black in light mode, near-white in dark mode
- extra space above each heading to separate sections

Rhythm

- consistent vertical spacing between all article blocks
- the Entity Card receives slightly more breathing room than paragraphs

---

# Reusability Rules

Every component introduced inside articles must be reusable.

Avoid duplicated logic.

Avoid duplicated styles.

Avoid duplicated data.

Adding a new entity should only require creating one new entity object.

Existing components should never need modification.

---

# Design Philosophy

Typography remains the hero.

Components support the content.

Whitespace is important.

Never overcrowd articles.

Maintain visual rhythm between:

- heading
- paragraph
- Rich Mention
- Entity Card

Everything should feel balanced.

---

# Response Rules

After every implementation,

Claude Code MUST provide an implementation report.

Example

## Components Added

RichMention

EntityCard

---

## New Entity

ruang-tambah

---

## Files Modified

components/writing/RichMention.tsx

components/writing/EntityCard.tsx

entities/ruang-tambah.ts

---

## Placeholder Assets

Logo

/public/logo/ruang-tambah.svg

Preview

/public/placeholders/ruang-tambah-preview.png

---

## Manual Action Required

Replace

/public/placeholders/ruang-tambah-preview.png

with the real preview image.

---

# Future Components

This specification is designed to grow.

Future reusable article components should follow the same philosophy.

Examples

- Callout
- Quote
- Code Block
- Timeline
- Gallery
- Image Comparison
- Video Embed
- Tweet Embed
- FAQ
- Reference List

Every future component must remain:

- reusable
- data-driven
- minimal
- maintainable
- responsive
- visually consistent

This document should always be considered the single source of truth for every Writing page implementation.
