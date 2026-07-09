# Writing Workflow

> This document defines the implementation workflow for every task related to the Writing section.
>
> It does **not** define the writing style or UI design.
>
> Those are documented separately:
>
> - `docs/writing-spec.md`
> - `docs/ui-writing.md`

---

# Purpose

This document exists to ensure every Writing implementation follows the same workflow, architecture, and maintenance rules.

Before making any changes related to Writing, always read:

1. `docs/writing-workflow.md`
2. `docs/writing-spec.md`
3. `docs/ui-writing.md`

These three documents together are the source of truth.

---

# General Principles

Always prioritize:

- consistency
- maintainability
- scalability
- reusability

Do not introduce new patterns when an existing solution already exists.

Avoid over-engineering.

Preserve the existing design language.

---

# Scope

This workflow applies to:

- new articles
- article updates
- entity creation
- Rich Mention
- Entity Card
- Writing UI
- Writing components
- category pages
- recommendation system
- Writing architecture

---

# Default Workflow

Whenever asked to create a new Writing article, always follow this order.

## Step 1

Read:

- writing-workflow.md
- writing-spec.md
- ui-writing.md

Never skip this step.

---

## Step 2

Understand the provided context.

Identify:

- article objective
- writing tone
- possible headings
- entities
- reusable content

---

## Step 3

Determine whether the article introduces any new entity.

If yes:

- create a new entity
- register it
- prepare placeholder assets
- implement Rich Mention
- implement Entity Card

If not:

reuse the existing entity.

---

## Step 4

Create the article.

The article should:

- follow writing-spec.md
- follow ui-writing.md
- follow the existing architecture

---

## Step 5

Verify the implementation.

Confirm that:

- metadata is complete
- article renders correctly
- entity references work
- placeholder assets are documented
- implementation follows the design system

---

# Architecture Rules

Never change the existing architecture unless explicitly requested.

Current architecture:

- one article = one file
- automatic article discovery
- reusable components
- centralized data layer
- dynamic routing
- entity registry

Respect the current architecture.

---

# Article Rules

Every new article should:

- be implemented in its own file
- use the existing metadata format
- use the existing content structure

Default status:

```ts
status: "draft";
```

Do not publish automatically.

The author decides when the article becomes:

```ts
status: "published";
```

---

# Rich Mention Rules

When an entity is mentioned for the first time:

- use Rich Mention

Subsequent mentions:

- use plain text

Never use Rich Mention repeatedly for the same entity unless explicitly requested.

---

# Entity Card Rules

Entity Cards appear only after the discussion related to the entity has finished.

Do not place Entity Cards randomly.

Entity Cards should help readers continue exploring the referenced entity.

---

# New Entity Workflow

If a new entity is required:

1. Create the entity.
2. Register it.
3. Add placeholder assets if necessary.
4. Document missing assets.

Placeholder assets are preferred over fake assets.

Always inform the author which files should be replaced manually.

---

# Assets

If required assets are unavailable:

Use placeholders.

Never invent logos.

Never invent screenshots.

Never generate fake previews.

Leave clear comments explaining:

- expected file
- expected location
- recommended dimensions (if known)

---

# Design Rules

Never invent a new visual style.

Always follow:

docs/ui-writing.md

If a reusable component already exists,

reuse it.

Do not duplicate layouts.

---

# Component Rules

Before creating a new component:

Ask yourself:

Can an existing component be reused?

If yes,

reuse it.

Only create a new component when the existing component cannot reasonably support the new requirement.

---

# Documentation Rules

Update documentation only if:

- a new reusable component is introduced
- a new writing rule is introduced
- a new UI rule is introduced
- the architecture changes

Do NOT rewrite documentation for small implementation details.

---

# Refactoring Rules

Do not refactor unrelated code.

Keep changes focused.

Only refactor when it clearly improves:

- maintainability
- readability
- reusability

Avoid unnecessary changes.

---

# Implementation Report

Every Writing task should end with a report.

Include:

## Files Created

## Files Modified

## New Entity

## Placeholder Assets

## Documentation Updated

## Notes

Keep the report concise.

---

# Future Features

This architecture should remain compatible with future additions such as:

- Quote
- Callout
- Video Embed
- Code Block
- Gallery
- Timeline
- Table
- Tweet Embed
- GitHub Card
- PDF Preview
- Tags
- Search
- RSS

New features should follow the existing Writing architecture and design language.

---

# Non Goals

Do not:

- redesign the Writing UI
- replace reusable components
- introduce a different design language
- change routing unnecessarily
- change the data layer without reason
- over-engineer simple features

---

# Final Reminder

When implementing anything related to Writing:

Think in this order:

Workflow

↓

Architecture

↓

Writing Rules

↓

UI Rules

↓

Implementation

↓

Verification

↓

Implementation Report

Maintain consistency over creativity.

A predictable system is more valuable than a clever one.
