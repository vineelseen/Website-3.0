import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder } from '../geometryBuilder'

/** Circuit breaker — three separate vertical poles with insulators */
export function buildCircuitBreakerParts(): GeometryPart[] {
  const parts: GeometryPart[] = []

  // Horizontal mechanical base / frame
  parts.push({
    create: () => box(2.0, 0.15, 0.7),
    position: [0, -0.85, 0],
    weight: 1.0,
  })
  parts.push({
    create: () => box(1.8, 0.08, 0.55),
    position: [0, -0.75, 0],
    weight: 0.6,
  })

  const poleX = [-0.65, 0, 0.65]

  for (const x of poleX) {
    // Insulator column (stacked porcelain sections)
    for (let s = 0; s < 4; s++) {
      parts.push({
        create: () => cylinder(0.1 + (s % 2) * 0.02, 0.1 + ((s + 1) % 2) * 0.02, 0.22, 12),
        position: [x, -0.35 + s * 0.24, 0],
        weight: 1.4,
      })
    }

    // Interrupter chamber
    parts.push({
      create: () => cylinder(0.14, 0.14, 0.35, 12),
      position: [x, 0.35, 0],
      weight: 1.6,
    })

    // Top contact / terminal
    parts.push({
      create: () => cylinder(0.06, 0.08, 0.2, 10),
      position: [x, 0.65, 0],
      weight: 1.0,
    })
    parts.push({
      create: () => box(0.12, 0.04, 0.12),
      position: [x, 0.78, 0],
      weight: 0.6,
    })

    // Lower tank housing
    parts.push({
      create: () => box(0.22, 0.3, 0.22),
      position: [x, -0.55, 0],
      weight: 1.0,
    })
  }

  // Cross support beam
  parts.push({
    create: () => box(1.6, 0.06, 0.06),
    position: [0, 0.1, 0],
    weight: 0.7,
  })
  parts.push({
    create: () => box(0.06, 0.5, 0.06),
    position: [-0.65, -0.1, 0.3],
    weight: 0.4,
  })
  parts.push({
    create: () => box(0.06, 0.5, 0.06),
    position: [0.65, -0.1, 0.3],
    weight: 0.4,
  })

  return parts
}

export const CIRCUIT_BREAKER_HITBOX: [number, number, number] = [2.4, 2.0, 0.9]
