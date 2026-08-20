import { chromium } from 'playwright'
import { writeFileSync } from 'fs'

const url = 'http://localhost:5173/'
const errors = []

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (err) => errors.push(err.message))

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(2500)

const typographyLocked = await page.evaluate(() => {
  const typography = document.querySelector('.hero-typography')
  const title = document.querySelector('.hero-typography__title')
  const spans = title?.querySelectorAll('span') ?? []
  const cta = document.querySelector('.hero-typography__cta')
  const typoStyle = typography ? getComputedStyle(typography) : null
  const titleStyle = title ? getComputedStyle(title) : null

  return {
    typographyTop: typoStyle?.top,
    titleFontSize: titleStyle?.fontSize,
    titleColor: titleStyle?.color,
    spanCount: spans.length,
    spanWhiteSpace: [...spans].map((s) => getComputedStyle(s).whiteSpace),
    headlineText: title?.innerText,
    ctaText: cta?.textContent?.trim(),
    ctaColor: cta ? getComputedStyle(cta).color : null,
    typographyBg: typoStyle?.backgroundColor,
    hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
  }
})

async function sampleRmEyeRegion() {
  return page.evaluate(() => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return null
    const title = document.querySelector('.hero-typography__title')
    if (!title) return null

    const titleRect = title.getBoundingClientRect()
    const cx = window.innerWidth / 2
    const sampleY = titleRect.top - 28
    const sampleX = cx

    const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!ctx) return { error: 'no webgl' }

    const gl = ctx
    const dpr = window.devicePixelRatio || 1
    const px = new Uint8Array(4)
    const x = Math.round(sampleX * dpr)
    const y = Math.round((canvas.clientHeight - sampleY) * dpr)
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px)

    return {
      sampleX,
      sampleY,
      rgba: [px[0], px[1], px[2], px[3]],
      titleTop: titleRect.top,
      typographyTop: getComputedStyle(document.querySelector('.hero-typography')).top,
    }
  })
}

const sampleA = await sampleRmEyeRegion()
await page.waitForTimeout(4500)
const sampleB = await sampleRmEyeRegion()

await page.screenshot({ path: '/workspace/stage3-verify.png', fullPage: false })

const layout = await page.evaluate(() => {
  const title = document.querySelector('.hero-typography__title')
  const rect = title?.getBoundingClientRect()
  return {
    headlineWidthPct: title
      ? ((rect.width / window.innerWidth) * 100).toFixed(1)
      : null,
    headlineTopPx: rect?.top,
  }
})

const result = {
  typographyLocked,
  layout,
  rmEyeSamples: { t0: sampleA, t4500ms: sampleB },
  breathingDeltaBlue:
    sampleA?.rgba && sampleB?.rgba ? Math.abs(sampleB.rgba[2] - sampleA.rgba[2]) : null,
  errors,
}

writeFileSync('/workspace/stage3-verify.json', JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))

await browser.close()
