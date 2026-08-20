import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'

const tempPosition = new THREE.Vector3()
const tempNormal = new THREE.Vector3()

export interface ParticleData {
  positions: Float32Array
  normals: Float32Array
  randoms: Float32Array
  count: number
}

/**
 * Sample particle positions from a BufferGeometry surface.
 * Used for both placeholder geometries and loaded GLB models.
 */
export function sampleParticlesFromGeometry(
  geometry: THREE.BufferGeometry,
  count: number,
): ParticleData {
  geometry.computeVertexNormals()

  const mesh = new THREE.Mesh(geometry)
  const sampler = new MeshSurfaceSampler(mesh).build()

  const positions = new Float32Array(count * 3)
  const normals = new Float32Array(count * 3)
  const randoms = new Float32Array(count)

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
  }

  mesh.geometry.dispose()

  return { positions, normals, randoms, count }
}

export function getBaseParticleCount(density: number, qualityMultiplier: number): number {
  const base = 2500
  return Math.floor(base * density * qualityMultiplier)
}
