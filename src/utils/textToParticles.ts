export interface TextParticleData {
  positions: Float32Array
  randoms: Float32Array
  count: number
}

/**
 * Sample particle positions from canvas-rendered text.
 * Used for RM EYE particle typography.
 */
export function textToParticles(
  text: string,
  options: {
    font?: string
    fontSize?: number
    spacing?: number
    density?: number
  } = {},
): TextParticleData {
  const {
    font = '600 72px Orbitron, sans-serif',
    fontSize = 72,
    spacing = 1.2,
    density = 1,
  } = options

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const padding = 40

  ctx.font = font
  const metrics = ctx.measureText(text)
  const w = Math.ceil(metrics.width + padding * 2)
  const h = Math.ceil(fontSize * spacing + padding * 2)

  canvas.width = w
  canvas.height = h

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, w, h)
  ctx.font = font
  ctx.fillStyle = '#fff'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(text, w / 2, h / 2)

  const imageData = ctx.getImageData(0, 0, w, h)
  const pixels = imageData.data
  const candidates: { x: number; y: number }[] = []

  const step = density < 0.7 ? 3 : density < 0.9 ? 2 : 1
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4
      if (pixels[i + 3] > 128) {
        candidates.push({ x, y })
      }
    }
  }

  const count = candidates.length
  const positions = new Float32Array(count * 3)
  const randoms = new Float32Array(count)

  const scale = 0.012
  for (let i = 0; i < count; i++) {
    const { x, y } = candidates[i]
    const i3 = i * 3
    positions[i3] = (x - w / 2) * scale
    positions[i3 + 1] = -(y - h / 2) * scale
    positions[i3 + 2] = 0
    randoms[i] = Math.random()
  }

  return { positions, randoms, count }
}
