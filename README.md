# Taiwanese Waves 2026

Website for Taiwanese Waves — a celebration of Taiwanese music and culture, August 16, 2026 at Rumsey Playfield, Central Park, NYC.

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- Tailwind CSS
- Framer Motion

## Fonts

- **Archivo** — body text
- **Rational Display** (Semi Bold + Light) — headings and hero

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/
  components/       # Page sections (Hero, Nav, Lineup, About, History, TimelineStories, Sponsors, Footer)
  design-system/    # Shared tokens and components (SocialLinks, AnimatedWave)
  merch/            # Merch page
  globals.css       # All styles (Tailwind + custom CSS)
  layout.js         # Root layout, font loading, metadata, OG image
  page.js           # Home page
public/
  artists/          # Artist photos (.webp)
  hero/             # Hero images (background, double-circle, spinner)
  photos/           # Year-by-year event photos (2016–2025)
  sponsors/         # Sponsor logos
```

## Sections

- **Hero** — full-screen with parallax double-circle mask and rotating spinner
- **About** — autoplay video with vignette overlay
- **Lineup** — 2026 artist grid (trio + solo artists) with bios and social links
- **History** — collapsible year rows (2016–2025) with photo carousels
- **Stories** — attendee memory cards (hardcoded in `TimelineStories.js`)
- **Sponsors** — tiered sponsor logos
