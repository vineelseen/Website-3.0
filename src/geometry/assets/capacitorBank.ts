import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder } from '../geometryBuilder'

/** Capacitor bank — multiple units in organized rows */
export function buildCapacitorBankParts(): GeometryPart[] {
  const parts: GeometryPart[] = []

  // Support frame
  parts.push({
    create: () => box(1.8, 0.1, 0.8),
    position: [0, -0.55, 0],
    weight: 0.6,
  })
  parts.push({
    create: () => box(0.08, 1.0, 0.08),
    position: [-0.8, 0, 0.35],
    weight: 0.4,
  })
  parts.push({
    create: () => box(0.08, 1.0, 0.08),
    position: [0.8, 0, 0.35],
    weight: 0.4,
  })

  // Capacitor units — 2 rows of 4
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      parts.push({
        create: () => box(0.28, 0.7, 0.3),
        position: [-0.45 + col * 0.3, -0.05 + row * 0.35, 0],
        weight: 1.5,
      })
      // Unit terminal posts
      parts.push({
        create: () => cylinder(0.02, 0.02, 0.08, 6),
        position: [-0.45 + col * 0.3, 0.32 + row * 0.35, 0.1],
        weight: 0.5,
      })
    }
  }

  // Bus connections on top
  parts.push({
    create: () => box(1.4, 0.05, 0.05),
    position: [0, 0.55, 0],
    weight: 0.9,
  })
  parts.push({
    create: () => box(1.4, 0.05, 0.05),
    position: [0, 0.25, 0],
    weight: 0.8,
  })

  // Insulators on bus
  for (let i = 0; i < 3; i++) {
    parts.push({
      create: () => cylinder(0.04, 0.05, 0.15, 8),
      position: [-0.4 + i * 0.4, 0.65, 0],
      weight: 0.7,
    })
  }

  return parts
}

export const CAPACITOR_BANK_HITBOX: [number, number, number] = [1.9, 1.4, 0.7]
