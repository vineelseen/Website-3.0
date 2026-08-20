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
await page.waitForTimeout(2000)

const checks = await page.evaluate(() => {
  const title = document.querySelector('.hero-typography__title')
  const spans = title?.querySelectorAll('span') ?? []
  const cta = document.querySelector('.hero-typography__cta')
  const typography = document.querySelector('.hero-typography')
  const oldHeadline = document.querySelector('.hero-content__heading')
  const rmEye = document.querySelector('.hero-content__rm-eye-spacer')

  const titleStyle = title ? getComputedStyle(title) : null
  const typoStyle = typography ? getComputedStyle(typography) : null
  const ctaStyle = cta ? getComputedStyle(cta) : null

  return {
    hasTypography: !!typography,
    hasOldHeadline: !!oldHeadline,
    hasRmEyeSpacer: !!rmEye,
    spanCount: spans.length,
    headlineText: title?.innerText,
    spanWhiteSpace: [...spans].map((s) => getComputedStyle(s).whiteSpace),
    fontFamily: titleStyle?.fontFamily,
    fontWeight: titleStyle?.fontWeight,
    color: titleStyle?.color,
    headlineWidthPct: title
      ? ((title.getBoundingClientRect().width / window.innerWidth) * 100).toFixed(1)
      : null,
    typographyTopPct: typoStyle
      ? parseFloat(typoStyle.top) / window.innerHeight * 100
      : null,
    typographyBg: typoStyle?.backgroundColor,
    typographyBorder: typoStyle?.border,
    typographyBoxShadow: typoStyle?.boxShadow,
    ctaVisible: !!cta && cta.textContent?.includes('EXPLORE THE RM ECOSYSTEM'),
    ctaColor: ctaStyle?.color,
    ctaLetterSpacing: ctaStyle?.letterSpacing,
    hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
    canvasCount: document.querySelectorAll('canvas').length,
    hasParticleHero: !!document.querySelector('.particle-hero'),
  }
})

// CTA hover check
const ctaBox = await page.locator('.hero-typography__cta').boundingBox()
if (ctaBox) {
  await page.mouse.move(ctaBox.x + ctaBox.width / 2, ctaBox.y + ctaBox.height / 2)
  await page.waitForTimeout(350)
}

const hoverCheck = await page.evaluate(() => {
  const cta = document.querySelector('.hero-typography__cta')
  const arrow = document.querySelector('.hero-typography__arrow')
  return {
    ctaHoverColor: cta ? getComputedStyle(cta).color : null,
    arrowTransform: arrow ? getComputedStyle(arrow).transform : null,
  }
})

await page.screenshot({ path: '/workspace/stage2-verify.png', fullPage: false })

const result = { checks, hoverCheck, errors }
writeFileSync('/workspace/stage2-verify.json', JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))

await browser.close()
