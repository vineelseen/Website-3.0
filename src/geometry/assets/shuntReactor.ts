import * as THREE from 'three'
import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder } from '../geometryBuilder'

/** Shunt reactor — distinct from transformer with reactor tank and coils */
export function buildShuntReactorParts(): GeometryPart[] {
  const parts: GeometryPart[] = []

  parts.push({
    create: () => box(1.6, 0.12, 1.2),
    position: [0, -0.7, 0],
    weight: 0.6,
  })

  parts.push({
    create: () => cylinder(0.5, 0.55, 1.2, 16),
    position: [0, -0.05, 0],
    weight: 2.5,
  })

  parts.push({
    create: () => cylinder(0.52, 0.5, 0.08, 16),
    position: [0, 0.6, 0],
    weight: 0.8,
  })

  for (let i = 0; i < 4; i++) {
    parts.push({
      create: () => box(0.05, 0.8, 0.4),
      position: [-0.58, -0.05, -0.3 + i * 0.2],
      weight: 1.2,
    })
    parts.push({
      create: () => box(0.05, 0.8, 0.4),
      position: [0.58, -0.05, -0.3 + i * 0.2],
      weight: 1.2,
    })
  }

  parts.push({
    create: () => {
      const g = cylinder(0.12, 0.12, 0.9, 12)
      g.rotateZ(Math.PI / 2)
      return g
    },
    position: [0, 0.85, -0.1],
    weight: 1.0,
  })

  parts.push({
    create: () => cylinder(0.07, 0.08, 0.4, 10),
    position: [-0.2, 0.75, 0.15],
    weight: 1.4,
  })
  parts.push({
    create: () => cylinder(0.07, 0.08, 0.4, 10),
    position: [0.2, 0.75, 0.15],
    weight: 1.4,
  })

  for (let r = 0; r < 3; r++) {
    parts.push({
      create: () => {
        const torus = new THREE.TorusGeometry(0.48, 0.02, 6, 24)
        torus.rotateX(Math.PI / 2)
        return torus
      },
      position: [0, -0.2 + r * 0.25, 0],
      weight: 0.9,
    })
  }

  return parts
}

export const SHUNT_REACTOR_HITBOX: [number, number, number] = [1.4, 1.8, 1.2]
