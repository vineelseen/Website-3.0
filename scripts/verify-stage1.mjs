import { chromium } from 'playwright'
import { writeFileSync } from 'fs'

const url = 'http://localhost:5173/'
const viewports = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
]

const errors = []
const results = []

const browser = await chromium.launch({ headless: true })

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${vp.name}] ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`[${vp.name}] ${err.message}`))

  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(1200)

  const check = await page.evaluate(() => {
    const hero = document.querySelector('.hero-foundation')
    const bg = document.querySelector('.hero-foundation__background')
    const canvas = document.querySelector('canvas')
    const oldHero = document.querySelector('.particle-hero')
    const headline = document.querySelector('.hero-content__heading')
    const bodyStyle = getComputedStyle(document.body)
    const heroStyle = hero ? getComputedStyle(hero) : null

    return {
      hasHeroFoundation: !!hero,
      hasOldHero: !!oldHero,
      hasHeadline: !!headline,
      hasCanvas: !!canvas,
      bodyOverflow: bodyStyle.overflow,
      bodyMargin: bodyStyle.margin,
      heroWidth: heroStyle?.width,
      heroHeight: heroStyle?.height,
      heroMinHeight: heroStyle?.minHeight,
      heroOverflow: heroStyle?.overflow,
      bgBackground: bg ? getComputedStyle(bg).backgroundImage : null,
      scrollHeight: document.documentElement.scrollHeight,
      innerHeight: window.innerHeight,
      hasVerticalScroll: document.documentElement.scrollHeight > window.innerHeight + 1,
    }
  })

  if (vp.name === '1920x1080') {
    await page.screenshot({ path: '/workspace/stage1-verify.png', fullPage: false })
  }

  results.push({ viewport: vp.name, ...check })
  await page.close()
}

writeFileSync('/workspace/stage1-verify.json', JSON.stringify({ results, errors }, null, 2))
console.log(JSON.stringify({ results, errors }, null, 2))

await browser.close()
