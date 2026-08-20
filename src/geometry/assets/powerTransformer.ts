import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder } from '../geometryBuilder'

/**
 * Large utility power transformer — procedural construction framework.
 * Silhouette: main tank, radiator banks, HV/LV bushings, conservator, OLTC, skid.
 */
export function buildPowerTransformerParts(): GeometryPart[] {
  const parts: GeometryPart[] = []

  // Base / skid
  parts.push({
    create: () => box(2.4, 0.12, 1.5),
    position: [0, -0.76, 0],
    weight: 0.6,
  })
  parts.push({
    create: () => box(2.2, 0.08, 1.3),
    position: [0, -0.68, 0],
    weight: 0.4,
  })

  // Main transformer tank
  parts.push({
    create: () => box(2.0, 1.35, 1.15),
    position: [0, -0.05, 0],
    weight: 2.5,
  })

  // Tank top edge / cover
  parts.push({
    create: () => box(2.05, 0.08, 1.2),
    position: [0, 0.66, 0],
    weight: 0.8,
  })

  // Radiator banks — left side (multiple fin panels)
  for (let i = 0; i < 5; i++) {
    parts.push({
      create: () => box(0.06, 1.0, 0.55),
      position: [-1.08, -0.05, -0.35 + i * 0.18],
      weight: 1.2,
    })
  }
  parts.push({
    create: () => box(0.1, 1.1, 1.0),
    position: [-1.12, -0.05, 0],
    weight: 0.7,
  })

  // Radiator banks — right side
  for (let i = 0; i < 5; i++) {
    parts.push({
      create: () => box(0.06, 1.0, 0.55),
      position: [1.08, -0.05, -0.35 + i * 0.18],
      weight: 1.2,
    })
  }
  parts.push({
    create: () => box(0.1, 1.1, 1.0),
    position: [1.12, -0.05, 0],
    weight: 0.7,
  })

  // Horizontal conservator tank
  const conservator = cylinder(0.18, 0.18, 1.5, 14)
  conservator.rotateZ(Math.PI / 2)
  parts.push({
    create: () => conservator.clone(),
    position: [0, 1.05, -0.15],
    weight: 1.4,
  })

  // Conservator support saddles
  parts.push({
    create: () => box(0.12, 0.2, 0.25),
    position: [-0.45, 0.88, -0.15],
    weight: 0.5,
  })
  parts.push({
    create: () => box(0.12, 0.2, 0.25),
    position: [0.45, 0.88, -0.15],
    weight: 0.5,
  })

  // Pipes connecting conservator to main tank
  parts.push({
    create: () => cylinder(0.04, 0.04, 0.35, 8),
    position: [-0.35, 0.82, -0.1],
    weight: 0.6,
  })
  parts.push({
    create: () => cylinder(0.04, 0.04, 0.35, 8),
    position: [0.35, 0.82, -0.1],
    weight: 0.6,
  })

  // Three tall HV bushings
  const hvPositions: [number, number, number][] = [
    [-0.55, 0.95, 0.2],
    [0, 0.95, 0.25],
    [0.55, 0.95, 0.2],
  ]
  for (const pos of hvPositions) {
    parts.push({
      create: () => cylinder(0.09, 0.11, 0.55, 12),
      position: pos,
      weight: 1.8,
    })
    parts.push({
      create: () => cylinder(0.07, 0.09, 0.2, 10),
      position: [pos[0], pos[1] + 0.35, pos[2]],
      weight: 1.2,
    })
    parts.push({
      create: () => cylinder(0.05, 0.07, 0.15, 8),
      position: [pos[0], pos[1] + 0.52, pos[2]],
      weight: 0.8,
    })
  }

  // Smaller LV bushings
  parts.push({
    create: () => cylinder(0.06, 0.07, 0.3, 10),
    position: [-0.3, 0.82, -0.35],
    weight: 1.0,
  })
  parts.push({
    create: () => cylinder(0.06, 0.07, 0.3, 10),
    position: [0.3, 0.82, -0.35],
    weight: 1.0,
  })

  // OLTC compartment on side
  parts.push({
    create: () => box(0.35, 0.55, 0.4),
    position: [1.05, 0.15, 0.45],
    weight: 1.0,
  })
  parts.push({
    create: () => cylinder(0.05, 0.05, 0.2, 8),
    position: [1.05, 0.5, 0.45],
    weight: 0.6,
  })

  // Lifting lugs / small structural details
  parts.push({
    create: () => box(0.08, 0.06, 0.08),
    position: [-0.9, 0.7, 0.5],
    weight: 0.3,
  })
  parts.push({
    create: () => box(0.08, 0.06, 0.08),
    position: [0.9, 0.7, 0.5],
    weight: 0.3,
  })

  // Cable boxes at base
  parts.push({
    create: () => box(0.25, 0.2, 0.2),
    position: [-0.6, -0.55, 0.5],
    weight: 0.5,
  })
  parts.push({
    create: () => box(0.25, 0.2, 0.2),
    position: [0.6, -0.55, 0.5],
    weight: 0.5,
  })

  return parts
}

export const POWER_TRANSFORMER_HITBOX: [number, number, number] = [2.6, 2.2, 1.6]
