# Rugged Monitoring — RM Home Page 3.0

A full React + TypeScript implementation of the **RM Home Page_Mid Fd_v5** design, aligned with the live WordPress reference at [rmbeta.wpenginepowered.com](https://rmbeta.wpenginepowered.com/).

Built with Vite, React 19, TypeScript, and React Three Fiber for the interactive hero particle ecosystem.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production Build

```bash
npm run build
npm run preview
```

## Page Structure

| Section | Description |
|---------|-------------|
| **Header** | Sticky navigation with responsive mobile menu |
| **Hero** | Interactive Three.js particle ecosystem (RM EYE + power transformer) |
| **Trusted & Compliant** | Video background, RM EYE modules embed |
| **Do More with RM EYE** | 70% stat block + transformer visualization |
| **Partner Marquee** | Animated trusted partner logo strip |
| **RM Ecosystem** | Interactive ecosystem flow embed |
| **Solution Breadth** | 131+ assets showcase embed |
| **Industry Breadth** | Tabbed Generation / Transmission / Distribution / Consumption cards |
| **Product Breadth** | Dual-row sensors & monitors slider embed |
| **Why RM** | Feature grid + capabilities circle embed |
| **Success Stories** | Carousel with case study metrics |
| **Contact** | Gradient CTA section |
| **Footer** | Links, contact info, legal |

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** for dev/build
- **React Three Fiber** + **Three.js** for procedural particle hero
- **CSS Modules-style** component CSS matching WordPress Elementor tokens (Sora, Inter, `#194F90` brand palette)

## WordPress Integration

Build the project and enqueue `dist/` assets in WordPress/Elementor. The hero mounts to a container element; remaining sections are semantic HTML for accessibility and SEO.

## Performance

- Respects `prefers-reduced-motion`
- Lazy-loaded iframes and images
- WebGL fallback when unavailable
