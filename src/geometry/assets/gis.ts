import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder } from '../geometryBuilder'

/** Gas Insulated Switchgear — horizontal bus ducts, vertical chambers, flanges */
export function buildGisParts(): GeometryPart[] {
  const parts: GeometryPart[] = []

  // Main horizontal bus duct
  parts.push({
    create: () => {
      const g = cylinder(0.28, 0.28, 2.8, 14)
      g.rotateZ(Math.PI / 2)
      return g
    },
    position: [0, 0, 0],
    weight: 2.5,
  })

  // End flanges
  for (const x of [-1.45, 1.45]) {
    parts.push({
      create: () => {
        const g = cylinder(0.36, 0.28, 0.12, 14)
        g.rotateZ(Math.PI / 2)
        return g
      },
      position: [x, 0, 0],
      weight: 1.0,
    })
  }

  // Vertical breaker/interrupter chambers
  const chamberX = [-0.7, 0, 0.7]
  for (const x of chamberX) {
    parts.push({
      create: () => cylinder(0.2, 0.22, 0.9, 12),
      position: [x, 0.55, 0],
      weight: 1.8,
    })
    parts.push({
      create: () => cylinder(0.24, 0.2, 0.1, 12),
      position: [x, 0.08, 0],
      weight: 0.8,
    })
    parts.push({
      create: () => cylinder(0.14, 0.14, 0.35, 10),
      position: [x, 1.05, 0],
      weight: 1.0,
    })
  }

  // Branching bus section
  parts.push({
    create: () => {
      const g = cylinder(0.18, 0.18, 0.8, 12)
      g.rotateX(Math.PI / 2)
      return g
    },
    position: [0.9, 0.15, 0.35],
    weight: 1.2,
  })
  parts.push({
    create: () => {
      const g = cylinder(0.15, 0.15, 0.5, 10)
      g.rotateX(Math.PI / 2)
      return g
    },
    position: [-0.9, -0.1, -0.3],
    weight: 1.0,
  })

  // Support structures
  parts.push({
    create: () => box(0.12, 0.5, 0.12),
    position: [-0.7, -0.55, 0],
    weight: 0.5,
  })
  parts.push({
    create: () => box(0.12, 0.5, 0.12),
    position: [0.7, -0.55, 0],
    weight: 0.5,
  })
  parts.push({
    create: () => box(2.2, 0.08, 0.6),
    position: [0, -0.65, 0],
    weight: 0.6,
  })

  // Junction boxes
  parts.push({
    create: () => box(0.2, 0.25, 0.2),
    position: [0, 0.2, 0.35],
    weight: 0.7,
  })

  return parts
}

export const GIS_HITBOX: [number, number, number] = [3.2, 1.8, 1.2]
