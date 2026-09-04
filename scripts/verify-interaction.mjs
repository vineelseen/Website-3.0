import { chromium } from 'playwright'
import { writeFileSync } from 'fs'

const url = 'http://localhost:5173/'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)

async function sampleCanvas() {
  return page.evaluate(() => {
    const c = document.querySelector('canvas')
    if (!c) return null
    const ctx = c.getContext('2d')
    // WebGL canvas - use toDataURL approach via readback in 2d copy
    const tmp = document.createElement('canvas')
    tmp.width = c.width
    tmp.height = c.height
    const tctx = tmp.getContext('2d')
    if (!tctx) return null
    tctx.drawImage(c, 0, 0)
    const d = tctx.getImageData(700, 450, 1, 1).data
    const dLeft = tctx.getImageData(200, 500, 1, 1).data
    const dEye = tctx.getImageData(900, 450, 1, 1).data
    return {
      center: Array.from(d),
      left: Array.from(dLeft),
      eye: Array.from(dEye),
      nonZeroPixels: (() => {
        const all = tctx.getImageData(0, 0, c.width, c.height).data
        let count = 0
        for (let i = 0; i < all.length; i += 4) {
          if (all[i] > 10 || all[i + 1] > 10 || all[i + 2] > 10) count++
        }
        return count
      })(),
    }
  })
}

const idle = await sampleCanvas()

// Hover power transformer area (left side)
await page.mouse.move(220, 520)
await page.waitForTimeout(900)
const hover = await sampleCanvas()
await page.screenshot({ path: '/workspace/hero-hover-transformer.png' })

// Leave hover
await page.mouse.move(50, 50)
await page.waitForTimeout(900)
const afterLeave = await sampleCanvas()

// Parallax - move mouse to corner
await page.mouse.move(1300, 200)
await page.waitForTimeout(600)
const parallax = await sampleCanvas()

const result = { idle, hover, afterLeave, parallax }
writeFileSync('/workspace/hero-interaction.json', JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
await browser.close()
