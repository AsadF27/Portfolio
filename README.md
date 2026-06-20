# Asad Faridi — Portfolio

An interactive, premium portfolio for **Asad Faridi**, Digital Transformation & New Initiatives engineer at Fourth Partner Energy.

Built with **Next.js 14 (App Router) · TypeScript · Three.js (React Three Fiber) · GSAP · Lenis · Tailwind CSS**.

## Highlights

- **Immersive Three.js hero** — a custom-GLSL galaxy particle field that swirls, tilts to the mouse, and recedes as you scroll.
- **GSAP everywhere** — masked text reveals, magnetic buttons, a custom cursor, an infinite marquee, and scroll-parallaxed 3D project mockups.
- **Photo morph** — the About portrait flips between a professional and a candid shot (hover, tap, or keyboard).
- **Featured Work** — three production platforms (ESG Digital Hub, FPEL App Directory, FPEL PhotoBooth), each presented with its own 3D-tilted mockup, hard metrics, and scroll reveals.
- **Active Pipeline** — four in-UAT enterprise platforms in a distinct, compact "in progress" treatment.
- **Design system** — single sans-serif (Geist), a strict six-size type scale, one brand colour (solar gold), lighter card surfaces for depth, full button states, focus-visible rings, and `prefers-reduced-motion` support.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production

```bash
npm run build
npm start
```

## Structure

```
app/            layout, global styles (design tokens), page
components/      sections (Hero, About, FeaturedWork, ActivePipeline, Contact, Navbar)
components/three/   React Three Fiber galaxy hero
components/ui/   Reveal, TextReveal, RotatingWord, MagneticButton, Cursor, Marquee, SectionHeading
components/providers/  Lenis smooth-scroll
lib/            content.ts (all copy/data) + gsap.ts (plugin registration)
public/         pro.jpg, casual.jpg (optimized portraits)
```

All copy and metrics live in [`lib/content.ts`](lib/content.ts) — edit there to update the site.
