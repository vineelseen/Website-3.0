import { chromium } from 'playwright'
import { writeFileSync } from 'fs'

const url = 'http://localhost:5173/'
const errors = []
const logs = []

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

page.on('console', (msg) => {
  const text = `[${msg.type()}] ${msg.text()}`
  logs.push(text)
  if (msg.type() === 'error') errors.push(text)
})
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`))

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(3000)

const checks = {
  url,
  title: await page.title(),
  hasCanvas: await page.locator('canvas').count(),
  hasHeadline: await page.locator('.hero-content__heading').isVisible(),
  headlineText: await page.locator('.hero-content__heading').innerText(),
  hasCta: await page.locator('.hero-content__cta').isVisible(),
  heroSection: await page.locator('.particle-hero').isVisible(),
  canvasWidth: await page.evaluate(() => document.querySelector('canvas')?.width ?? 0),
  canvasHeight: await page.evaluate(() => document.querySelector('canvas')?.height ?? 0),
  webglContext: await page.evaluate(() => {
    const c = document.querySelector('canvas')
    if (!c) return null
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    return gl ? 'ok' : 'missing'
  }),
  pixelSample: await page.evaluate(() => {
    const c = document.querySelector('canvas')
    if (!c) return null
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    if (!gl) return null
    const pixels = new Uint8Array(4)
    gl.readPixels(Math.floor(c.width / 2), Math.floor(c.height / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
    return Array.from(pixels)
  }),
}

await page.screenshot({ path: '/workspace/hero-idle.png', fullPage: false })

// Hover over left side where power transformer should be
await page.mouse.move(280, 520)
await page.waitForTimeout(800)
await page.screenshot({ path: '/workspace/hero-hover.png', fullPage: false })

// Parallax test
await page.mouse.move(900, 400)
await page.waitForTimeout(500)
await page.screenshot({ path: '/workspace/hero-parallax.png', fullPage: false })

const result = { checks, errors, logs: logs.slice(0, 30) }
writeFileSync('/workspace/hero-verify.json', JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))

await browser.close()
