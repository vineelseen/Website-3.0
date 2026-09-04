import * as THREE from 'three'
import type { GeometryPart } from './geometryBuilder'
import { sphere, torus, cylinder } from './geometryBuilder'

/** RM EYE procedural geometry — abstract intelligent data core */
export function buildRMEyeParts(): GeometryPart[] {
  const parts: GeometryPart[] = []

  // Dense inner core — ellipsoidal particle concentration
  parts.push({
    create: () => {
      const g = sphere(0.18, 12)
      g.scale(1, 0.85, 1)
      return g
    },
    weight: 3.0,
  })

  // Middle organized shell
  parts.push({
    create: () => sphere(0.28, 10),
    weight: 2.0,
  })

  // Concentric particle rings (orbital data structures)
  const ringConfigs = [
    { radius: 0.38, tube: 0.006, weight: 1.5, rot: [Math.PI / 2, 0, 0] as [number, number, number] },
    { radius: 0.48, tube: 0.005, weight: 1.2, rot: [Math.PI / 3, 0.5, 0] as [number, number, number] },
    { radius: 0.55, tube: 0.004, weight: 1.0, rot: [Math.PI / 4, -0.3, 0.2] as [number, number, number] },
  ]

  for (const ring of ringConfigs) {
    parts.push({
      create: () => torus(ring.radius, ring.tube, 6, 48),
      rotation: ring.rot,
      weight: ring.weight,
    })
  }

  // Vertical data axis
  parts.push({
    create: () => cylinder(0.02, 0.02, 0.7, 8),
    weight: 0.8,
  })

  // Orbital data points — small spheres on ring paths
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    parts.push({
      create: () => sphere(0.025, 6),
      position: [Math.cos(angle) * 0.45, Math.sin(angle) * 0.1, Math.sin(angle) * 0.45],
      weight: 0.6,
    })
  }

  // Subtle interface disc (very thin, low weight)
  parts.push({
    create: () => {
      const g = new THREE.CircleGeometry(0.15, 20)
      g.rotateX(-Math.PI / 2)
      return g
    },
    position: [0, -0.12, 0],
    weight: 0.4,
  })

  return parts
}
