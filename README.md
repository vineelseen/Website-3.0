# Rugged Monitoring — Website 3.0

Homepage implementation for Rugged Monitoring Website 3.0, based on the **RM Home Page_Mid Fd_v5** Figma design.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Homepage Sections

1. **Interactive Hero** — Living Electrical Asset Ecosystem (React Three Fiber particle system)
2. **RM EYE Platform Intro** — Unified intelligence overview
3. **Make Every Asset Predictable** — Asset monitoring solutions accordion
4. **Find the Right Solution** — IIoT Sensors, Edge Devices, RM EYE cards
5. **Future-Proof Your Operations** — Interactive RM EYE asset circle
6. **Redefining Reliability** — Feature grid with platform image
7. **Industries** — Tabbed industry showcase
8. **Certifications** — ISO certification logos
9. **Client Logos** — Trusted by global leaders
10. **RM Resources** — Case studies, blogs, brochures

## Production Build

```bash
npm run build
npm run preview
```

## Architecture

| Component | Purpose |
|-----------|---------|
| `HomePage` | Full homepage layout with all sections |
| `HeroFoundation` | Interactive 3D particle hero |
| `Header` / `Footer` | Site navigation and footer |
| `src/components/sections/*` | Individual homepage sections |
| `src/data/homepage.ts` | Content and asset URLs |

## Procedural Asset System

Each electrical asset in the hero is generated **100% procedurally** using Three.js primitive geometries — no external 3D models required.

Asset definitions live in `src/geometry/assets/`.
