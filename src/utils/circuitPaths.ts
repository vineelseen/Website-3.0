import * as THREE from 'three'

export interface PathSample {
  points: THREE.Vector3[]
  positions: Float32Array
  progresses: Float32Array
  randoms: Float32Array
  along: Float32Array
}

/** Build a Manhattan (90°) circuit path from asset to hub */
export function createManhattanPath(
  from: THREE.Vector3,
  to: THREE.Vector3,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [from.clone()]

  const midX = (from.x + to.x) * 0.5
  const elbow1 = new THREE.Vector3(from.x, from.y, to.z * 0.6 + from.z * 0.4)
  const elbow2 = new THREE.Vector3(midX, from.y, to.z)
  const elbow3 = new THREE.Vector3(midX, to.y, to.z)
  const elbow4 = new THREE.Vector3(to.x, to.y, to.z)

  if (Math.abs(from.x - to.x) > 0.3) {
    points.push(new THREE.Vector3(from.x, from.y, elbow1.z))
    points.push(elbow1)
  }
  if (Math.abs(elbow1.x - midX) > 0.2) {
    points.push(new THREE.Vector3(midX, from.y, elbow1.z))
  }
  points.push(elbow2)
  if (Math.abs(from.y - to.y) > 0.2) {
    points.push(elbow3)
  }
  points.push(elbow4)

  return points
}

export function samplePath(
  waypoints: THREE.Vector3[],
  count: number,
): PathSample {
  const curve = new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.0)
  const positions = new Float32Array(count * 3)
  const progresses = new Float32Array(count)
  const randoms = new Float32Array(count)
  const along = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    const p = curve.getPoint(t)
    const i3 = i * 3
    positions[i3] = p.x
    positions[i3 + 1] = p.y
    positions[i3 + 2] = p.z
    progresses[i] = Math.random()
    randoms[i] = Math.random()
    along[i] = t
  }

  return { points: waypoints, positions, progresses, randoms, along }
}

/** Create path texture for GPU lookup — rows = paths, cols = points */
export function createPathTexture(
  paths: THREE.Vector3[][],
  pointsPerPath = 32,
): { texture: THREE.DataTexture; pointCount: number } {
  const pathCount = paths.length
  const data = new Float32Array(pathCount * pointsPerPath * 4)

  for (let p = 0; p < pathCount; p++) {
    const curve = new THREE.CatmullRomCurve3(paths[p], false, 'catmullrom', 0.0)
    for (let i = 0; i < pointsPerPath; i++) {
      const t = i / (pointsPerPath - 1)
      const pt = curve.getPoint(t)
      const idx = (p * pointsPerPath + i) * 4
      data[idx] = pt.x
      data[idx + 1] = pt.y
      data[idx + 2] = pt.z
      data[idx + 3] = 1
    }
  }

  const texture = new THREE.DataTexture(
    data,
    pointsPerPath,
    pathCount,
    THREE.RGBAFormat,
    THREE.FloatType,
  )
  texture.needsUpdate = true
  return { texture, pointCount: pointsPerPath }
}
