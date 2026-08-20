import * as THREE from 'three'
import type { GeometryPart } from '../geometryBuilder'
import { box, cylinder, tube } from '../geometryBuilder'

/** Three large curved HV cables with termination structures */
export function buildPowerCablesParts(): GeometryPart[] {
  const parts: GeometryPart[] = []

  const cableOffsets = [-0.25, 0, 0.25]

  for (const zOff of cableOffsets) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.9, -0.2, zOff),
      new THREE.Vector3(-0.4, 0.15, zOff + 0.05),
      new THREE.Vector3(0.1, 0.05, zOff - 0.03),
      new THREE.Vector3(0.6, -0.1, zOff),
      new THREE.Vector3(1.0, -0.25, zOff),
    ])

    parts.push({
      create: () => tube(curve, 32, 0.07, 10),
      weight: 2.0,
    })

    // Cable termination at end
    parts.push({
      create: () => cylinder(0.14, 0.1, 0.3, 12),
      position: [1.05, -0.22, zOff],
      weight: 1.5,
    })
    parts.push({
      create: () => cylinder(0.18, 0.14, 0.12, 12),
      position: [1.05, -0.05, zOff],
      weight: 1.2,
    })
    parts.push({
      create: () => cylinder(0.1, 0.12, 0.08, 10),
      position: [1.05, 0.05, zOff],
      weight: 0.8,
    })

    // Stress cone at start
    parts.push({
      create: () => cylinder(0.12, 0.07, 0.15, 10),
      position: [-0.85, -0.15, zOff],
      weight: 1.0,
    })
  }

  // Support bracket
  parts.push({
    create: () => box(0.08, 0.4, 0.7),
    position: [0.3, -0.35, 0],
    weight: 0.5,
  })

  return parts
}

export const POWER_CABLES_HITBOX: [number, number, number] = [2.4, 0.8, 0.8]
