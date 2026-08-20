import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export interface GeometryPart {
  create: () => THREE.BufferGeometry
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  /** Relative particle density weight — higher = more particles on this feature */
  weight?: number
}

export function box(w: number, h: number, d: number): THREE.BoxGeometry {
  return new THREE.BoxGeometry(w, h, d)
}

export function cylinder(
  rTop: number,
  rBottom: number,
  h: number,
  segments = 16,
): THREE.CylinderGeometry {
  return new THREE.CylinderGeometry(rTop, rBottom, h, segments)
}

export function sphere(radius: number, segments = 16): THREE.SphereGeometry {
  return new THREE.SphereGeometry(radius, segments, segments)
}

export function torus(
  radius: number,
  tube: number,
  radialSegments = 12,
  tubularSegments = 32,
): THREE.TorusGeometry {
  return new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments)
}

export function tube(
  curve: THREE.Curve<THREE.Vector3>,
  tubularSegments: number,
  radius: number,
  radialSegments = 8,
): THREE.TubeGeometry {
  return new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false)
}

function applyPartTransform(geo: THREE.BufferGeometry, part: GeometryPart): THREE.BufferGeometry {
  if (part.scale !== undefined) {
    if (typeof part.scale === 'number') geo.scale(part.scale, part.scale, part.scale)
    else geo.scale(part.scale[0], part.scale[1], part.scale[2])
  }
  if (part.rotation) {
    geo.rotateX(part.rotation[0])
    geo.rotateY(part.rotation[1])
    geo.rotateZ(part.rotation[2])
  }
  if (part.position) geo.translate(part.position[0], part.position[1], part.position[2])
  return geo
}

/** Merge geometry parts into a single BufferGeometry with transforms applied */
export function buildMergedGeometry(parts: GeometryPart[]): THREE.BufferGeometry {
  const geometries = parts.map((part) => {
    const geo = part.create()
    return applyPartTransform(geo, part)
  })
  const merged = mergeGeometries(geometries)
  geometries.forEach((g) => g.dispose())
  if (!merged) throw new Error('Failed to merge geometry parts')
  return merged
}

/** Build per-part geometries for weighted particle sampling */
export function buildPartGeometries(
  parts: GeometryPart[],
): { geometry: THREE.BufferGeometry; weight: number }[] {
  return parts.map((part) => ({
    geometry: applyPartTransform(part.create(), part),
    weight: part.weight ?? 1,
  }))
}
