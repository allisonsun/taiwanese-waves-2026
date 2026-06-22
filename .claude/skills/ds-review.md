---
name: ds-review
description: Review new or changed components for design system compliance
---

Review all recently changed or newly created components in this project against the design system rules below. Report any violations and suggest the correct fix for each.

## Design System Location

`app/design-system/` — source of truth for all shared UI.

- `index.js` — barrel: import everything from here
- `tokens.js` — color, font, z-index constants
- `AnimatedWave.js` — animated SVG wave (parameterized)
- `SocialLinks.js` — social icon links

## Rules

### Tokens
- NEVER hardcode `#000`, `#fff`, `#fdf108`, `rgba(255,255,255,...)`, or `rgba(0,0,0,...)` in inline styles or JS
- Import from `../design-system`: `colors.black`, `colors.white`, `colors.yellow`, `colors.textMuted`, `colors.overlay`, `colors.backdrop`
- NEVER hardcode font stacks — use `fonts.body`, `fonts.heading`, `fonts.headingLight`
- NEVER hardcode z-index numbers — use `zIndex.nav`, `zIndex.modal`, `zIndex.loader`

### Shared components
- NEVER reimplement `AnimatedWave` inline — import from `../design-system`
- NEVER reimplement `SocialLinks` inline — import from `../design-system`
- New shared UI patterns (buttons, modals, icons) must go into `app/design-system/` before use

### CSS
- Class names follow section-prefixed BEM-lite: `lineup-*`, `history-*`, `about-*`, `stories-*`, `nav-*`, `loader-*`
- Styles go in `globals.css` under the relevant section comment, not inline
- Breakpoints: mobile `max-width: 768px`, tablet `min-width: 600px and max-width: 768px`, iPad Pro `min-width: 769px and max-width: 1200px`

### General
- New below-fold sections must be lazy-loaded with `next/dynamic` in `page.js`
- Images must use `next/image` — raw `<img>` only for sponsor logos and social icons
- `priority` prop on `<Image>` only for above-the-fold images

## Output format

For each violation: file path + line number, rule broken, and a corrected code snippet.
If no violations: confirm the component is design-system compliant.
