import { chromium } from 'playwright'
import { writeFileSync } from 'fs'

const url = 'http://localhost:5173/'
const errors = []
const logs = []

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

page.on('console', (msg) => {
  const text = msg.text()
  logs.push(text)
  if (msg.type() === 'error') errors.push(text)
})
page.on('pageerror', (err) => errors.push(err.message))

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(3500)

const checks = await page.evaluate(() => {
  const title = document.querySelector('.hero-typography__title')
  const spans = title?.querySelectorAll('span') ?? []
  const typography = document.querySelector('.hero-typography')
  const label = document.querySelector('.hero-foundation__asset-label')

  return {
    headlineText: title?.innerText,
    spanCount: spans.length,
    spanWhiteSpace: [...spans].map((s) => getComputedStyle(s).whiteSpace),
    typographyTop: typography ? getComputedStyle(typography).top : null,
    titleFontSize: title ? getComputedStyle(title).fontSize : null,
    titleColor: title ? getComputedStyle(title).color : null,
    ctaText: document.querySelector('.hero-typography__cta')?.textContent?.trim(),
    labelText: label?.textContent?.trim(),
    labelLeft: label ? getComputedStyle(label).left : null,
    hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
    canvasCount: document.querySelectorAll('canvas').length,
  }
})

const blues = []
for (let i = 0; i < 8; i++) {
  await page.screenshot({ path: i === 0 ? '/workspace/stage4-verify.png' : `/workspace/stage4-breath-${i}.png` })
  const sample = await page.evaluate(() => {
    const img = document.createElement('canvas')
    const src = document.querySelector('canvas')
    if (!src) return 0
    img.width = 400
    img.height = 120
    const ctx = img.getContext('2d')
    if (!ctx) return 0
    ctx.drawImage(src, 280, 180, 400, 120, 0, 0, 400, 120)
    let sum = 0
    const d = ctx.getImageData(0, 0, 400, 120).data
    for (let j = 0; j < d.length; j += 4) sum += d[2]
    return sum / (d.length / 4)
  })
  blues.push(sample)
  await page.waitForTimeout(900)
}

const particleLogs = logs.filter(
  (l) => l.includes('Power Transformer particle count') || l.includes('RM EYE particle count'),
)

const result = {
  checks,
  particleLogs,
  rmEyeBreathingDelta: Math.max(...blues) - Math.min(...blues),
  errors,
}
writeFileSync('/workspace/stage4-verify.json', JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))

await browser.close()
