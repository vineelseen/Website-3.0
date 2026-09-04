import * as THREE from 'three'
import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder, tube } from '../geometryBuilder'

const TANK_HALF_W = 1.2
const TANK_HALF_D = 0.72
const TANK_H = 1.12
const TANK_Y = -0.06

function buildBase(): GeometryPart[] {
  const railSpan = 2.85
  const railOffset = 0.92

  return [
    { create: () => box(railSpan, 0.07, 0.11), position: [-0.95, -0.82, railOffset], weight: 0.5 },
    { create: () => box(railSpan, 0.07, 0.11), position: [-0.95, -0.82, -railOffset], weight: 0.5 },
    { create: () => box(0.1, 0.06, 1.75), position: [-2.28, -0.82, 0], weight: 0.45 },
    { create: () => box(0.1, 0.06, 1.75), position: [0.38, -0.82, 0], weight: 0.45 },
    { create: () => box(0.08, 0.05, 0.22), position: [-0.35, -0.84, 0.55], weight: 0.35 },
    { create: () => box(0.08, 0.05, 0.22), position: [0.15, -0.84, -0.55], weight: 0.35 },
    { create: () => box(0.08, 0.05, 0.22), position: [-1.55, -0.84, 0.2], weight: 0.35 },
    { create: () => box(2.35, 0.05, 1.55), position: [-0.95, -0.76, 0], weight: 0.55 },
  ]
}

function buildMainTank(): GeometryPart[] {
  return [
    {
      create: () => box(TANK_HALF_W * 2, TANK_H, TANK_HALF_D * 2),
      position: [-0.95, TANK_Y, 0],
      weight: 1.35,
    },
    {
      create: () => box(TANK_HALF_W * 2 + 0.08, 0.07, TANK_HALF_D * 2 + 0.06),
      position: [-0.95, TANK_Y + TANK_H * 0.5 + 0.03, 0],
      weight: 0.7,
    },
    {
      create: () => box(TANK_HALF_W * 2 + 0.06, 0.06, TANK_HALF_D * 2 + 0.05),
      position: [-0.95, TANK_Y - TANK_H * 0.5 - 0.02, 0],
      weight: 0.55,
    },
    {
      create: () => box(0.06, TANK_H * 0.82, TANK_HALF_D * 2 + 0.04),
      position: [-0.95 - TANK_HALF_W - 0.02, TANK_Y, 0],
      weight: 0.45,
    },
    {
      create: () => box(0.06, TANK_H * 0.82, TANK_HALF_D * 2 + 0.04),
      position: [-0.95 + TANK_HALF_W + 0.02, TANK_Y, 0],
      weight: 0.45,
    },
  ]
}

function buildRadiatorBank(side: -1 | 1, zCenter = 0): GeometryPart[] {
  const parts: GeometryPart[] = []
  const finCount = 14
  const finHeight = 0.9
  const finThickness = 0.018
  const finDepth = 0.085
  const finSpacing = 0.054
  const bankSpan = (finCount - 1) * finSpacing + finDepth

  const tankEdgeX = -0.95 + side * TANK_HALF_W
  const finCenterX = tankEdgeX + side * 0.14

  for (let i = 0; i < finCount; i++) {
    const z = zCenter - bankSpan * 0.5 + i * finSpacing
    parts.push({
      create: () => box(finThickness, finHeight, finDepth),
      position: [finCenterX, TANK_Y, z],
      weight: 1.85,
    })
  }

  parts.push({
    create: () => box(0.055, 0.045, bankSpan + 0.06),
    position: [finCenterX - side * 0.025, TANK_Y + finHeight * 0.5 + 0.02, zCenter],
    weight: 0.95,
  })
  parts.push({
    create: () => box(0.055, 0.045, bankSpan + 0.06),
    position: [finCenterX - side * 0.025, TANK_Y - finHeight * 0.5 - 0.02, zCenter],
    weight: 0.95,
  })
  parts.push({
    create: () => box(0.035, finHeight + 0.06, 0.035),
    position: [finCenterX - side * 0.04, TANK_Y, zCenter - bankSpan * 0.5 - 0.02],
    weight: 0.65,
  })
  parts.push({
    create: () => box(0.035, finHeight + 0.06, 0.035),
    position: [finCenterX - side * 0.04, TANK_Y, zCenter + bankSpan * 0.5 + 0.02],
    weight: 0.65,
  })

  return parts
}

function buildHVBushing(x: number, z: number): GeometryPart[] {
  const parts: GeometryPart[] = []
  const baseY = TANK_Y + TANK_H * 0.5 + 0.02
  const shedCount = 8

  parts.push({
    create: () => cylinder(0.07, 0.085, 0.16, 12),
    position: [x, baseY, z],
    weight: 1.65,
  })

  for (let i = 0; i < shedCount; i++) {
    const rTop = 0.072 - i * 0.0035
    const rBot = 0.055 - i * 0.0025
    parts.push({
      create: () => cylinder(rTop, rBot, 0.048, 12),
      position: [x, baseY + 0.14 + i * 0.078, z],
      weight: 1.8,
    })
  }

  parts.push({
    create: () => cylinder(0.028, 0.038, 0.12, 10),
    position: [x, baseY + 0.14 + shedCount * 0.078 + 0.04, z],
    weight: 1.05,
  })

  return parts
}

function buildLVBushing(x: number, z: number, baseY = TANK_Y + TANK_H * 0.5 + 0.02): GeometryPart[] {
  const parts: GeometryPart[] = []

  parts.push({
    create: () => cylinder(0.042, 0.05, 0.08, 10),
    position: [x, baseY, z],
    weight: 0.95,
  })

  for (let i = 0; i < 3; i++) {
    parts.push({
      create: () => cylinder(0.04 - i * 0.0025, 0.032 - i * 0.002, 0.032, 10),
      position: [x, baseY + 0.07 + i * 0.038, z],
      weight: 0.9,
    })
  }

  parts.push({
    create: () => cylinder(0.018, 0.024, 0.05, 8),
    position: [x, baseY + 0.19, z],
    weight: 0.65,
  })

  return parts
}

function buildLVBushings(): GeometryPart[] {
  return [
    ...buildLVBushing(-1.55, -0.42),
    ...buildLVBushing(-1.2, -0.48),
    ...buildLVBushing(-0.55, -0.52),
    ...buildLVBushing(-0.15, -0.46),
  ]
}

function buildConservator(): GeometryPart[] {
  const parts: GeometryPart[] = []
  const conservator = cylinder(0.145, 0.145, 1.85, 16)
  conservator.rotateZ(Math.PI / 2)

  parts.push({
    create: () => conservator.clone(),
    position: [-0.95, 1.12, -0.52],
    weight: 1.45,
  })

  parts.push({
    create: () => box(0.1, 0.24, 0.12),
    position: [-1.72, 0.94, -0.52],
    weight: 0.6,
  })
  parts.push({
    create: () => box(0.1, 0.24, 0.12),
    position: [-0.18, 0.94, -0.52],
    weight: 0.6,
  })

  const pipeCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-1.35, 0.88, -0.42),
    new THREE.Vector3(-1.05, 0.98, -0.18),
    new THREE.Vector3(-0.75, 0.82, -0.08),
  )
  parts.push({
    create: () => tube(pipeCurve, 14, 0.04, 8),
    weight: 0.75,
  })

  parts.push({
    create: () => cylinder(0.04, 0.04, 0.22, 8),
    position: [-0.62, 0.78, -0.1],
    weight: 0.55,
  })

  parts.push({
    create: () => cylinder(0.03, 0.03, 0.16, 8),
    position: [-1.15, 0.76, -0.28],
    weight: 0.45,
  })

  return parts
}

function buildOLTC(): GeometryPart[] {
  const x = -0.95 + TANK_HALF_W + 0.34
  const z = 0.42

  return [
    { create: () => box(0.28, 0.72, 0.34), position: [x, TANK_Y + 0.04, z], weight: 1.0 },
    { create: () => box(0.22, 0.1, 0.28), position: [x, TANK_Y + 0.42, z], weight: 0.65 },
    { create: () => cylinder(0.035, 0.035, 0.14, 8), position: [x, TANK_Y + 0.52, z], weight: 0.5 },
    { create: () => box(0.06, 0.18, 0.08), position: [x - 0.12, TANK_Y + 0.08, z], weight: 0.45 },
  ]
}

function buildTopDetails(): GeometryPart[] {
  const roofY = TANK_Y + TANK_H * 0.5

  return [
    { create: () => box(0.07, 0.05, 0.1), position: [-1.95, roofY + 0.04, 0.35], weight: 0.35 },
    { create: () => box(0.07, 0.05, 0.1), position: [-0.15, roofY + 0.04, 0.35], weight: 0.35 },
    { create: () => cylinder(0.022, 0.022, 0.16, 8), position: [-1.35, roofY + 0.08, 0.18], weight: 0.35 },
    { create: () => cylinder(0.022, 0.022, 0.14, 8), position: [-0.55, roofY + 0.07, 0.12], weight: 0.3 },
    { create: () => box(0.14, 0.08, 0.1), position: [-1.75, roofY + 0.05, -0.12], weight: 0.4 },
    { create: () => box(0.12, 0.06, 0.08), position: [-0.35, roofY + 0.04, -0.08], weight: 0.35 },
    { create: () => box(0.08, 0.04, 0.06), position: [-2.05, roofY + 0.03, -0.25], weight: 0.3 },
    { create: () => box(0.08, 0.04, 0.06), position: [0.05, roofY + 0.03, -0.25], weight: 0.3 },
  ]
}

/** Full procedural power transformer part list for sampling / debug mesh */
export function buildPowerTransformerParts(): GeometryPart[] {
  return [
    ...buildBase(),
    ...buildMainTank(),
    ...buildRadiatorBank(-1, 0.05),
    ...buildRadiatorBank(1, -0.08),
    ...buildHVBushing(-1.75, 0.52),
    ...buildHVBushing(-0.95, 0.58),
    ...buildHVBushing(-0.15, 0.52),
    ...buildLVBushings(),
    ...buildConservator(),
    ...buildOLTC(),
    ...buildTopDetails(),
  ]
}

export const POWER_TRANSFORMER_HITBOX: [number, number, number] = [2.8, 2.3, 1.8]
