import * as THREE from 'three'

export interface RmEyeParticleData {
  positions: Float32Array
  count: number
  boundingBox: THREE.Box3
}

const MASK_WIDTH = 1024
const MASK_HEIGHT = 256
const SAMPLE_GAP = 4
const DEFAULT_SCALE = 0.0042

/**
 * Stage 3 debug — sample RM EYE from an in-memory canvas mask only.
 * White text on a transparent background (never fill the canvas opaque).
 */
export function createRmEyeParticleMask(scale = DEFAULT_SCALE): RmEyeParticleData {
  const canvas = document.createElement('canvas')
  canvas.width = MASK_WIDTH
  canvas.height = MASK_HEIGHT

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.error('RM EYE mask: failed to acquire 2D context')
    return {
      positions: new Float32Array(0),
      count: 0,
      boundingBox: new THREE.Box3(),
    }
  }

  ctx.clearRect(0, 0, MASK_WIDTH, MASK_HEIGHT)
  ctx.font = 'bold 180px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.fillText('RM EYE', MASK_WIDTH / 2, MASK_HEIGHT / 2)

  const imageData = ctx.getImageData(0, 0, MASK_WIDTH, MASK_HEIGHT)
  const pixels = imageData.data
  const coords: number[] = []

  for (let y = 0; y < MASK_HEIGHT; y += SAMPLE_GAP) {
    for (let x = 0; x < MASK_WIDTH; x += SAMPLE_GAP) {
      const i = (y * MASK_WIDTH + x) * 4
      const alpha = pixels[i + 3]
      if (alpha > 128) {
        coords.push((x - MASK_WIDTH / 2) * scale)
        coords.push(-(y - MASK_HEIGHT / 2) * scale)
        coords.push(0)
      }
    }
  }

  const positions = new Float32Array(coords)
  const count = positions.length / 3

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.computeBoundingBox()
  const boundingBox = geometry.boundingBox?.clone() ?? new THREE.Box3()
  geometry.dispose()

  console.info(`RM EYE particle count: ${count}`)
  if (count > 0) {
    console.info(
      'RM EYE bounding box:',
      `min(${boundingBox.min.x.toFixed(3)}, ${boundingBox.min.y.toFixed(3)}, ${boundingBox.min.z.toFixed(3)})`,
      `max(${boundingBox.max.x.toFixed(3)}, ${boundingBox.max.y.toFixed(3)}, ${boundingBox.max.z.toFixed(3)})`,
    )
  } else {
    console.error('RM EYE mask generation failed — particle count is 0')
  }

  return { positions, count, boundingBox }
}
