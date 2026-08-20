import * as THREE from 'three'
import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder, tube } from '../geometryBuilder'

function buildBase(): GeometryPart[] {
  return [
    { create: () => box(2.5, 0.1, 1.55), position: [0, -0.78, 0], weight: 0.55 },
    { create: () => box(0.12, 0.08, 1.45), position: [-0.95, -0.82, 0], weight: 0.45 },
    { create: () => box(0.12, 0.08, 1.45), position: [0.95, -0.82, 0], weight: 0.45 },
    { create: () => box(0.08, 0.06, 0.35), position: [-0.4, -0.82, 0.55], weight: 0.35 },
    { create: () => box(0.08, 0.06, 0.35), position: [0.4, -0.82, -0.55], weight: 0.35 },
  ]
}

function buildMainTank(): GeometryPart[] {
  return [
    { create: () => box(2.05, 1.38, 1.18), position: [0, -0.04, 0], weight: 1.4 },
    { create: () => box(2.1, 0.09, 1.22), position: [0, 0.67, 0], weight: 0.75 },
    { create: () => box(2.08, 0.05, 1.2), position: [0, -0.72, 0], weight: 0.5 },
  ]
}

function buildRadiatorBank(side: -1 | 1): GeometryPart[] {
  const parts: GeometryPart[] = []
  const xBase = side * 1.08

  for (let bank = 0; bank < 2; bank++) {
    const x = xBase + side * bank * 0.07
    for (let i = 0; i < 12; i++) {
      parts.push({
        create: () => box(0.028, 0.98, 0.42),
        position: [x, -0.04, -0.44 + i * 0.08],
        weight: 1.65,
      })
    }
  }

  parts.push({
    create: () => box(0.08, 1.05, 0.95),
    position: [xBase + side * 0.06, -0.04, 0],
    weight: 0.85,
  })

  return parts
}

function buildHVBushing(x: number, z: number): GeometryPart[] {
  const parts: GeometryPart[] = []
  const baseY = 0.74

  parts.push({
    create: () => cylinder(0.1, 0.12, 0.22, 14),
    position: [x, baseY, z],
    weight: 1.7,
  })

  for (let i = 0; i < 7; i++) {
    const rTop = 0.1 - i * 0.004
    const rBot = 0.08 - i * 0.003
    parts.push({
      create: () => cylinder(rTop, rBot, 0.055, 12),
      position: [x, baseY + 0.18 + i * 0.085, z],
      weight: 1.75,
    })
  }

  parts.push({
    create: () => cylinder(0.045, 0.055, 0.14, 10),
    position: [x, baseY + 0.82, z],
    weight: 1.1,
  })

  return parts
}

function buildLVBushings(): GeometryPart[] {
  return [
    { create: () => cylinder(0.055, 0.065, 0.18, 10), position: [-0.35, 0.78, -0.38], weight: 1.15 },
    { create: () => cylinder(0.05, 0.06, 0.12, 10), position: [-0.35, 0.92, -0.38], weight: 0.9 },
    { create: () => cylinder(0.055, 0.065, 0.18, 10), position: [0.2, 0.78, -0.42], weight: 1.1 },
    { create: () => cylinder(0.05, 0.06, 0.12, 10), position: [0.2, 0.92, -0.42], weight: 0.85 },
    { create: () => cylinder(0.045, 0.055, 0.15, 10), position: [0.55, 0.76, -0.3], weight: 1.0 },
  ]
}

function buildConservator(): GeometryPart[] {
  const parts: GeometryPart[] = []
  const conservator = cylinder(0.19, 0.19, 1.55, 16)
  conservator.rotateZ(Math.PI / 2)

  parts.push({
    create: () => conservator.clone(),
    position: [0.05, 1.08, -0.18],
    weight: 1.5,
  })

  parts.push({
    create: () => box(0.14, 0.22, 0.28),
    position: [-0.5, 0.9, -0.18],
    weight: 0.55,
  })
  parts.push({
    create: () => box(0.14, 0.22, 0.28),
    position: [0.55, 0.9, -0.18],
    weight: 0.55,
  })

  const pipeCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.25, 0.86, -0.08),
    new THREE.Vector3(-0.15, 0.95, 0.02),
    new THREE.Vector3(-0.05, 0.88, -0.05),
  )
  parts.push({
    create: () => tube(pipeCurve, 12, 0.035, 8),
    weight: 0.7,
  })

  parts.push({
    create: () => cylinder(0.035, 0.035, 0.28, 8),
    position: [0.15, 0.84, -0.06],
    weight: 0.55,
  })

  return parts
}

function buildOLTC(): GeometryPart[] {
  return [
    { create: () => box(0.38, 0.58, 0.42), position: [1.08, 0.12, 0.48], weight: 1.05 },
    { create: () => box(0.08, 0.12, 0.35), position: [1.08, 0.46, 0.48], weight: 0.6 },
    { create: () => cylinder(0.045, 0.045, 0.18, 8), position: [1.08, 0.58, 0.48], weight: 0.55 },
  ]
}

function buildTopDetails(): GeometryPart[] {
  return [
    { create: () => box(0.08, 0.06, 0.08), position: [-0.92, 0.72, 0.52], weight: 0.35 },
    { create: () => box(0.08, 0.06, 0.08), position: [0.92, 0.72, 0.52], weight: 0.35 },
    { create: () => cylinder(0.025, 0.025, 0.2, 8), position: [-0.15, 0.78, 0.35], weight: 0.4 },
    { create: () => cylinder(0.025, 0.025, 0.18, 8), position: [0.4, 0.76, 0.32], weight: 0.35 },
    { create: () => box(0.26, 0.18, 0.2), position: [-0.62, -0.56, 0.52], weight: 0.5 },
    { create: () => box(0.26, 0.18, 0.2), position: [0.62, -0.56, 0.52], weight: 0.5 },
  ]
}

/** Full procedural power transformer part list for sampling / debug mesh */
export function buildPowerTransformerParts(): GeometryPart[] {
  return [
    ...buildBase(),
    ...buildMainTank(),
    ...buildRadiatorBank(-1),
    ...buildRadiatorBank(1),
    ...buildHVBushing(-0.58, 0.22),
    ...buildHVBushing(0, 0.28),
    ...buildHVBushing(0.58, 0.22),
    ...buildLVBushings(),
    ...buildConservator(),
    ...buildOLTC(),
    ...buildTopDetails(),
  ]
}

export const POWER_TRANSFORMER_HITBOX: [number, number, number] = [2.6, 2.2, 1.6]
