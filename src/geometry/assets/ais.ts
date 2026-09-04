import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder } from '../geometryBuilder'

/** Air Insulated Switchgear — outdoor substation arrangement */
export function buildAisParts(): GeometryPart[] {
  const parts: GeometryPart[] = []

  // Support structures / steel frame
  parts.push({
    create: () => box(0.1, 2.0, 0.1),
    position: [-0.8, 0, 0],
    weight: 0.5,
  })
  parts.push({
    create: () => box(0.1, 2.0, 0.1),
    position: [0.8, 0, 0],
    weight: 0.5,
  })
  parts.push({
    create: () => box(0.1, 2.0, 0.1),
    position: [-0.8, 0, -0.4],
    weight: 0.4,
  })
  parts.push({
    create: () => box(0.1, 2.0, 0.1),
    position: [0.8, 0, -0.4],
    weight: 0.4,
  })

  // Horizontal busbars (three phase)
  for (let i = 0; i < 3; i++) {
    parts.push({
      create: () => box(1.6, 0.06, 0.06),
      position: [0, 0.6 + i * 0.2, 0],
      weight: 1.2,
    })
  }

  // Insulator columns (three phase disconnectors)
  const phaseX = [-0.5, 0, 0.5]
  for (const x of phaseX) {
    // Insulator stack
    for (let s = 0; s < 3; s++) {
      parts.push({
        create: () => cylinder(0.08, 0.1, 0.2, 10),
        position: [x, -0.2 + s * 0.22, 0.15],
        weight: 1.4,
      })
    }
    // Disconnector blade
    parts.push({
      create: () => box(0.04, 0.5, 0.04),
      position: [x, 0.35, 0.15],
      rotation: [0, 0, 0.3],
      weight: 1.0,
    })
    // Equipment housing
    parts.push({
      create: () => box(0.25, 0.5, 0.2),
      position: [x, -0.55, 0.15],
      weight: 1.0,
    })
  }

  // Cross beam
  parts.push({
    create: () => box(1.8, 0.08, 0.08),
    position: [0, 0.9, 0],
    weight: 0.7,
  })

  // Ground plane reference beam
  parts.push({
    create: () => box(1.8, 0.06, 0.5),
    position: [0, -0.85, 0],
    weight: 0.5,
  })

  return parts
}

export const AIS_HITBOX: [number, number, number] = [2.0, 2.2, 0.8]
