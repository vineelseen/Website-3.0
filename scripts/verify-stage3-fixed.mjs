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
await page.screenshot({ path: '/workspace/stage3-fixed-verify.png', fullPage: false })

const checks = await page.evaluate(() => {
  const title = document.querySelector('.hero-typography__title')
  const spans = title?.querySelectorAll('span') ?? []
  const typography = document.querySelector('.hero-typography')
  return {
    headlineText: title?.innerText,
    spanCount: spans.length,
    spanWhiteSpace: [...spans].map((s) => getComputedStyle(s).whiteSpace),
    typographyTop: typography ? getComputedStyle(typography).top : null,
    titleFontSize: title ? getComputedStyle(title).fontSize : null,
    titleColor: title ? getComputedStyle(title).color : null,
    typographyBg: typography ? getComputedStyle(typography).backgroundColor : null,
    ctaText: document.querySelector('.hero-typography__cta')?.textContent?.trim(),
    hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
  }
})

const particleLogs = logs.filter((l) => l.includes('RM EYE particle count') || l.includes('RM EYE bounding box'))

writeFileSync('/workspace/stage3-fixed-verify.json', JSON.stringify({ checks, particleLogs, errors }, null, 2))
console.log(JSON.stringify({ checks, particleLogs, errors }, null, 2))

await browser.close()
