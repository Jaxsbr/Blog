# Blog — Agent Guide

## Stack

React 18 + TypeScript + Vite. Posts are markdown files in `public/posts/`. Parsed at runtime with `gray-matter`. No build step for posts.

## Adding a post

Drop a `.md` file into `public/posts/`. Frontmatter shape:

```yaml
---
title: "Post title"
date: YYYY-MM-DD HH:MM:SS
tags:
- Tag1
- Tag2
---
```

Optional fields:
- `featured: true` — surfaces the post in the featured section
- `ai: true` — renders a footer note: "This post was AI-generated." Use only for posts with minimal human direction.

No authorship label needed for hybrid or human posts. The default assumption is human-driven.

## Generative cover art

Every post gets a unique header image generated at runtime by `src/components/PostCover.tsx`. No images to source or maintain.

**How it works:**
- The post slug is hashed to a seed number
- The seed selects a colour palette (6 available) and drives a seeded RNG
- The RNG determines: dot grid cell size, sine-wave frequencies and phases, dot radius, and circle positions
- Rendered to an HTML Canvas at 800×160px (card) or 800×200px (banner)
- CSS scales it to fill its container — `width: 100%; height: auto`

**Result:** same slug always produces the same art. Changing the slug produces different art. No frontmatter needed.

**To add a palette:** append an object to the `PALETTES` array in `PostCover.tsx`:

```typescript
{ bg1: '#hex', bg2: '#hex', dot: '#hex', accent: '#hex' }
```

- `bg1` / `bg2`: gradient endpoints (dark-to-lighter, same hue family)
- `dot`: dot grid colour (lighter, same hue family as background)
- `accent`: large soft circle colour (lightest, for depth)

Palette assignment is `hash % PALETTES.length` — adding a palette shifts assignments for all posts beyond that index. If you want stable assignments, append only (never insert).

## Typography

- **Body:** Inter (Google Fonts, 400/500/600)
- **Headings (h1–h3):** Fraunces (Google Fonts, 600/700) — loaded in `index.html`
- **Code:** JetBrains Mono (Google Fonts, 400/500)

Font imports live in `index.html`. Font stack fallbacks are in `index.css`.

## Quality checks

Run before committing:
```bash
npm run type-check
npm run lint
```
