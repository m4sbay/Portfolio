# Speaking Authoring Guide

> This document defines the authoring standard for every new Speaking session.
>
> The goal is to keep every Speaking page consistent in structure, writing quality, assets, and maintainability.
>
> Unless explicitly requested, follow this guide exactly.

---

# Goals

Every new Speaking session must:

- require **zero component changes**
- require **zero renderer changes**
- require **zero resolver changes**
- require **zero registry changes**
- follow the existing Speaking architecture
- be automatically discovered by the data layer
- pass typecheck, lint, and production build

A new Speaking session should always be a **data-only addition**.

---

# Architecture

Speaking uses auto-discovery.

Adding a new session should only require:

```
content/speaking/<slug>.ts
```

and its asset folder:

```
public/speaking/<slug>/
```

No manual imports.

No registry updates.

No route updates.

---

# File Structure

Every Speaking session must follow the existing `SpeakingSession` type.

Required fields:

- slug
- title
- date
- timeLabel
- location
- excerpt
- body
- cover

Optional:

- images
- resources

Never introduce new properties.

---

# Slug Convention

Slug must be:

- lowercase
- kebab-case
- descriptive
- stable

Examples:

```
design-presentation-canva-smkn5-oktober-2023
```

```
microblog-instagram-halokatalks
```

```
pitching-startup-kelolainaja-inatechno-2024
```

Never use spaces.

Never use underscores.

---

# Excerpt

Excerpt should:

- around 30–40 words
- summarize the story
- be different from the body
- make readers interested
- not sound like marketing copy

Avoid repeating the title.

---

# Body Structure

Use the existing block architecture.

Available blocks:

```ts
{
  type: "heading",
  content: "..."
}
```

```ts
{
  type: "paragraph",
  segments: [...]
}
```

Do not invent new block types.

---

# Headings

Use headings naturally.

Examples:

- Latar Belakang
- Persiapan
- Hari Pelaksanaan
- Tantangan
- Pelajaran
- Penutup

Avoid headings that feel too academic.

---

# Paragraph Style

Writing should feel like a personal story.

Preferred tone:

- conversational
- reflective
- humble
- enjoyable to read
- occasionally humorous

Avoid:

- corporate language
- motivational clichés
- exaggerated storytelling
- AI-sounding expressions

Humor is welcome if it naturally fits the story.

---

# Story Source

The story provided by the user is considered raw notes.

Rewrite it into a natural narrative while preserving:

- chronology
- important facts
- names
- places
- emotions
- humor
- lessons learned

Improve:

- readability
- transitions
- grammar
- storytelling flow

Never invent events.

Never exaggerate achievements.

If something is unclear, ask instead of assuming.

---

# Entities

Speaking uses the shared entity system from Writing.

Use:

```ts
{
  type: "mention",
  entity: "canva"
}
```

inside paragraph segments whenever appropriate.

If an entity does not yet exist:

- create it inside `content/entities`
- register it in `data/entities.ts`
- reuse the shared RichMention renderer

Never create a Speaking-specific entity system.

---

# Resources

Resources are article-specific.

Examples:

- slides
- website
- repository
- video
- document

Example:

```ts
resources: [
  {
    title: "Presentation Slides",
    url: "...",
    type: "slides",
  },
];
```

If there are no resources,
omit the field.

Do not use Resources for ordinary hyperlinks inside paragraphs.

---

# Cover

Every session should contain:

```ts
cover: {
  src: "cover.png",
  alt: "...",
  width: 1200,
  height: 800,
}
```

Alt text must describe the actual image.

Never use generic alt text.

---

# Gallery

If gallery exists:

```ts
images: [
  {
    src: "image-01.png",
    alt: "...",
  },
  {
    src: "image-02.png",
    alt: "...",
  },
  {
    src: "image-03.png",
    alt: "...",
  },
];
```

Alt text must describe each photo accurately.

Never reuse alt text from another Speaking page.

---

# Asset Folder

Every Speaking session must have:

```
public/
└── speaking/
    └── <slug>/
```

Claude should create the folder if it does not exist.

Do **NOT** generate placeholder PNG images.

Do **NOT** generate blank images.

Do **NOT** generate solid-color images.

Do **NOT** create `.gitkeep`.

If the real images are not available yet:

- create only the folder
- still reference the intended filenames inside the content file
- clearly mention that the user must add:

```
cover.png
image-01.png
image-02.png
image-03.png
```

before running the application.

This project intentionally uses real assets only.

---

# Image Cache Warning

When replacing an image using the same filename during development (for example replacing a temporary image with the real one), Next.js/Turbopack may serve a stale optimized image from:

```
.next/dev/cache/images
```

If images appear blank or outdated:

```
rm -rf .next/dev/cache/images
```

then restart the development server.

Do not modify source code to fix this issue.

It is a development cache issue.

---

# Dates

Use ISO format.

Correct:

```
2024-12-07
```

Incorrect:

```
7 December 2024
```

---

# Time

Example:

```
09.00 – 12.00 WIB
```

If unknown,
use a temporary placeholder and leave a TODO comment.

---

# Location

Use the real venue.

Example:

```
SMKN 5 Kota Padang
```

instead of:

```
School
```

---

# Content Philosophy

Speaking pages are stories.

Readers should understand:

- what happened
- why it mattered
- what was learned
- how it felt

Avoid turning the page into a certificate or event report.

---

# Things to Avoid

Never:

- duplicate another Speaking page
- copy placeholder paragraphs
- use AI clichés
- invent technical details
- exaggerate achievements
- fabricate conversations

If information is missing,
leave a TODO comment instead of making assumptions.

---

# Maintainability

A new Speaking session must never require editing:

- components
- routes
- renderers
- auto-discovery
- registry

If code outside the content file becomes necessary,
stop and explain why.

---

# Validation Checklist

Before finishing:

- verify slug
- verify ISO date
- verify image filenames
- verify resource URLs
- verify entity names
- verify alt text

Then run:

```
npx tsc --noEmit
```

```
npx eslint .
```

```
npm run build
```

Everything must pass without introducing new warnings or errors.

---

# Expected Output

At the end, report:

1. New content file created
2. Asset folder created
3. Resources added (if any)
4. Entities used (if any)
5. Image filenames prepared
6. Validation results

Do not modify unrelated files.

The result should be a fully integrated Speaking session that only requires the user to place the real image files into the prepared asset folder.
