# Harsh Shah — Portfolio

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Structure

```
app/
  layout.tsx       # Root layout + metadata
  page.tsx         # Home page
  globals.css      # Global styles + font imports

components/
  VideoIntro.tsx        # Fullscreen cinematic hero
  VideoIntro.module.css # Hero styles (responsive)
  CinematicLayer.tsx    # Three.js bokeh particle layer

public/
  videos/
    hero.mp4       # Talking-head video
```

## Stack
- Next.js 14 App Router
- Three.js (cinematic particles)
- GSAP (entrance animations)
- CSS Modules
