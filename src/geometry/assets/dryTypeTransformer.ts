import * as THREE from 'three'
import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder } from '../geometryBuilder'

/** Dry-type transformer — three vertical coil structures with support frames */
export function buildDryTypeTransformerParts(): GeometryPart[] {
  const parts: GeometryPart[] = []

  parts.push({
    create: () => box(1.6, 0.1, 0.9),
    position: [0, -0.72, 0],
    weight: 0.6,
  })
  parts.push({
    create: () => box(0.08, 1.4, 0.08),
    position: [-0.7, 0, 0.4],
    weight: 0.4,
  })
  parts.push({
    create: () => box(0.08, 1.4, 0.08),
    position: [0.7, 0, 0.4],
    weight: 0.4,
  })

  const coilX = [-0.42, 0, 0.42]
  for (const x of coilX) {
    parts.push({
      create: () => cylinder(0.22, 0.22, 1.2, 16),
      position: [x, 0, 0],
      weight: 2.0,
    })
    parts.push({
      create: () => cylinder(0.15, 0.15, 1.1, 14),
      position: [x, 0, 0],
      weight: 1.5,
    })
    for (let r = 0; r < 4; r++) {
      parts.push({
        create: () => {
          const torus = new THREE.TorusGeometry(0.18 - r * 0.03, 0.015, 6, 20)
          torus.rotateX(Math.PI / 2)
          return torus
        },
        position: [x, -0.4 + r * 0.25, 0],
        weight: 0.8,
      })
    }
  }

  parts.push({
    create: () => box(1.5, 0.1, 0.85),
    position: [0, 0.68, 0],
    weight: 0.7,
  })
  parts.push({
    create: () => box(1.3, 0.06, 0.7),
    position: [0, 0.62, 0],
    weight: 0.5,
  })
  parts.push({
    create: () => box(0.6, 0.05, 0.05),
    position: [0, 0.75, 0.15],
    weight: 0.8,
  })
  parts.push({
    create: () => cylinder(0.04, 0.04, 0.15, 8),
    position: [-0.42, 0.78, 0.15],
    weight: 0.6,
  })
  parts.push({
    create: () => cylinder(0.04, 0.04, 0.15, 8),
    position: [0.42, 0.78, 0.15],
    weight: 0.6,
  })

  return parts
}

export const DRY_TYPE_HITBOX: [number, number, number] = [1.8, 1.8, 1.0]
