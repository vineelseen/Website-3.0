# Rugged Monitoring — Interactive Particle Hero

A production-ready, full-width interactive hero section featuring a **Living Electrical Asset Ecosystem** built with Vite, React, TypeScript, and React Three Fiber.

All electrical assets are generated **100% procedurally** using Three.js primitive geometries — no external 3D models, images, or asset files required.

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

## Procedural Asset System

Each electrical asset is constructed from Three.js primitives (boxes, cylinders, torus, tubes, etc.) as an invisible construction framework. Particle positions are sampled from the combined geometry surfaces and rendered as `THREE.Points`.

Asset definitions live in `src/geometry/assets/`:

| File | Asset |
|------|-------|
| `powerTransformer.ts` | Power Transformer |
| `dryTypeTransformer.ts` | Dry-Type Transformer |
| `gis.ts` | Gas Insulated Switchgear |
| `circuitBreaker.ts` | Circuit Breaker |
| `rotatingMachine.ts` | Rotating Machine |
| `ais.ts` | Air Insulated Switchgear |
| `powerCables.ts` | Power Cables |
| `shuntReactor.ts` | Shunt Reactor |
| `capacitorBank.ts` | Capacitor Bank |

Positions, scale, and interaction settings are in `src/config/assets.ts`.

To adjust an asset's silhouette, edit its geometry parts in the corresponding file. Each part supports `position`, `rotation`, `scale`, and `weight` (particle density).

## Architecture

| Component | Purpose |
|-----------|---------|
| `ParticleHero` | Main hero wrapper with WebGL fallback |
| `HeroContent` | HTML typography + CTA overlay |
| `EcosystemScene` | R3F Canvas and scene composition |
| `ParticleAsset` | Reusable particle digital twin |
| `DataStream` | Animated particle paths to RM EYE |
| `RMEyeCore` | Procedural intelligence node |
| `geometryToParticles()` | Surface sampling utility |

## WordPress / Elementor Integration

Build the project, enqueue `dist/` assets, and mount to a container element. Typography and CTA remain accessible HTML above the WebGL canvas.

## Performance Tiers

- **High** — Full particles, bloom, proximity
- **Medium** — Reduced particles and post-processing
- **Low/Mobile** — Minimal particles, no bloom, reduced parallax

Respects `prefers-reduced-motion`.
