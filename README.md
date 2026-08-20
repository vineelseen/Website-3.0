# Rugged Monitoring — Interactive Particle Hero

A production-ready, full-width interactive hero section featuring a **Living Electrical Asset Ecosystem** built with Vite, React, TypeScript, and React Three Fiber.

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

## WordPress / Elementor Integration

The hero is a self-contained React component (`ParticleHero`) that can be embedded into WordPress via:

1. Build the project (`npm run build`)
2. Enqueue the generated JS/CSS from `dist/` in your theme or via a custom Elementor widget
3. Mount to a container element: `<div id="rm-hero-root"></div>`

Typography and CTA remain accessible HTML layered above the WebGL canvas.

## GLB Model Placement

Place optimized `.glb` / `.gltf` electrical asset models in:

```
public/models/
```

Then map each file in `src/config/models.ts`:

```ts
export const MODEL_URLS: Partial<Record<AssetId, string>> = {
  'power-transformer': '/models/power-transformer.glb',
  'dry-type-transformer': '/models/dry-type-transformer.glb',
  'gis': '/models/gis.glb',
  'ais': '/models/ais.glb',
  'circuit-breaker': '/models/circuit-breaker.glb',
  'rotating-machine': '/models/rotating-machine.glb',
  'power-cables': '/models/power-cables.glb',
  'shunt-reactor': '/models/shunt-reactor.glb',
  'capacitor-bank': '/models/capacitor-bank.glb',
}
```

Asset positions, density, and interaction settings are configured in `src/config/assets.ts`.

When a model URL is set, the system samples particle positions from the model geometry. Until models are provided, clearly marked placeholder geometries are used.

## Architecture

| Component | Purpose |
|-----------|---------|
| `ParticleHero` | Main hero wrapper with WebGL fallback |
| `HeroContent` | HTML typography + CTA overlay |
| `EcosystemScene` | R3F Canvas and scene composition |
| `ParticleAsset` | Reusable particle digital twin |
| `DataStream` | Animated particle paths to RM EYE |
| `RMEyeCore` | Intelligence node at scene center-right |
| `CursorInteraction` | Pointer tracking for parallax/proximity |
| `CameraParallax` | Subtle mouse-based camera response |
| `PerformanceManager` | Adaptive quality tiers |

## Performance Tiers

- **High** — Full particles, bloom, proximity
- **Medium** — Reduced particles and post-processing
- **Low/Mobile** — Minimal particles, no bloom, reduced parallax

Respects `prefers-reduced-motion`.
