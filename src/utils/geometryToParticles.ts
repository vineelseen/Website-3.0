import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import type { GeometryPart } from '../geometry/geometryBuilder'
import { buildMergedGeometry, buildPartGeometries } from '../geometry/geometryBuilder'

const tempPosition = new THREE.Vector3()
const tempNormal = new THREE.Vector3()

export interface ParticleData {
  positions: Float32Array
  normals: Float32Array
  randoms: Float32Array
  weights: Float32Array
  count: number
}

function sampleFromGeometry(geometry: THREE.BufferGeometry, count: number): ParticleData {
  geometry.computeVertexNormals()
  const mesh = new THREE.Mesh(geometry)
  const sampler = new MeshSurfaceSampler(mesh).build()

  const positions = new Float32Array(count * 3)
  const normals = new Float32Array(count * 3)
  const randoms = new Float32Array(count)
  const weights = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    sampler.sample(tempPosition, tempNormal)
    const i3 = i * 3
    positions[i3] = tempPosition.x
    positions[i3 + 1] = tempPosition.y
    positions[i3 + 2] = tempPosition.z
    normals[i3] = tempNormal.x
    normals[i3 + 1] = tempNormal.y
    normals[i3 + 2] = tempNormal.z
    randoms[i] = Math.random()
    weights[i] = 1
  }

  return { positions, normals, randoms, weights, count }
}

function mergeParticleData(chunks: ParticleData[]): ParticleData {
  const totalCount = chunks.reduce((sum, c) => sum + c.count, 0)
  const positions = new Float32Array(totalCount * 3)
  const normals = new Float32Array(totalCount * 3)
  const randoms = new Float32Array(totalCount)
  const weights = new Float32Array(totalCount)

  let offset = 0
  for (const chunk of chunks) {
    positions.set(chunk.positions, offset * 3)
    normals.set(chunk.normals, offset * 3)
    randoms.set(chunk.randoms, offset)
    weights.set(chunk.weights, offset)
    offset += chunk.count
  }

  return { positions, normals, randoms, weights, count: totalCount }
}

/**
 * Sample points from a single merged geometry surface.
 */
export function sampleGeometrySurface(
  geometry: THREE.BufferGeometry,
  count: number,
): ParticleData {
  return sampleFromGeometry(geometry, count)
}

/**
 * Build geometry from parts and sample with per-part density weighting.
 * Important structural features receive more particles via the weight property.
 */
export function geometryToParticles(parts: GeometryPart[], totalCount: number): ParticleData {
  const partGeos = buildPartGeometries(parts)
  const totalWeight = partGeos.reduce((sum, p) => sum + p.weight, 0)

  const chunks: ParticleData[] = []
  for (const { geometry, weight } of partGeos) {
    const count = Math.max(8, Math.floor((weight / totalWeight) * totalCount))
    const data = sampleFromGeometry(geometry, count)
    for (let i = 0; i < data.count; i++) data.weights[i] = weight
    chunks.push(data)
    geometry.dispose()
  }

  return mergeParticleData(chunks)
}

/**
 * Convenience: build merged geometry then sample uniformly.
 */
export function partsToParticles(parts: GeometryPart[], totalCount: number): ParticleData {
  const merged = buildMergedGeometry(parts)
  const data = sampleFromGeometry(merged, totalCount)
  merged.dispose()
  return data
}

export function getBaseParticleCount(density: number, qualityMultiplier: number): number {
  const base = 2800
  return Math.floor(base * density * qualityMultiplier)
}
