import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder } from '../geometryBuilder'

/** Large industrial rotating machine / motor-generator */
export function buildRotatingMachineParts(): GeometryPart[] {
  const parts: GeometryPart[] = []

  // Base skid
  parts.push({
    create: () => box(2.0, 0.12, 0.9),
    position: [0, -0.62, 0],
    weight: 0.6,
  })

  // Main cylindrical housing
  parts.push({
    create: () => cylinder(0.45, 0.45, 1.4, 18),
    position: [0, 0, 0],
    weight: 2.5,
  })

  // End bell housings / bearing caps
  parts.push({
    create: () => cylinder(0.38, 0.45, 0.18, 16),
    position: [0, 0.78, 0],
    weight: 1.2,
  })
  parts.push({
    create: () => cylinder(0.45, 0.38, 0.18, 16),
    position: [0, -0.78, 0],
    weight: 1.2,
  })

  // Cooling fins around housing
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2
    parts.push({
      create: () => box(0.03, 0.5, 0.12),
      position: [Math.cos(angle) * 0.5, 0, Math.sin(angle) * 0.5],
      rotation: [0, -angle, 0],
      weight: 0.7,
    })
  }

  // Central shaft extension
  parts.push({
    create: () => cylinder(0.06, 0.06, 0.45, 10),
    position: [0, -1.05, 0],
    weight: 0.8,
  })
  parts.push({
    create: () => cylinder(0.04, 0.06, 0.15, 8),
    position: [0, -1.25, 0],
    weight: 0.5,
  })

  // Terminal box on top
  parts.push({
    create: () => box(0.35, 0.2, 0.25),
    position: [0.35, 0.35, 0.35],
    weight: 1.0,
  })
  parts.push({
    create: () => box(0.15, 0.08, 0.08),
    position: [0.35, 0.48, 0.35],
    weight: 0.5,
  })

  // Lifting eye
  parts.push({
    create: () => cylinder(0.03, 0.03, 0.08, 8),
    position: [0, 0.55, 0.4],
    rotation: [Math.PI / 2, 0, 0],
    weight: 0.3,
  })

  return parts
}

export const ROTATING_MACHINE_HITBOX: [number, number, number] = [1.4, 2.2, 1.2]
