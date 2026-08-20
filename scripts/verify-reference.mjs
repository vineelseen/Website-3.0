import { chromium } from 'playwright'
import { writeFileSync } from 'fs'

const url = 'http://localhost:5173/'
const errors = []
const logs = []

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

page.on('console', (msg) => {
  const text = `[${msg.type()}] ${msg.text()}`
  logs.push(text)
  if (msg.type() === 'error') errors.push(text)
})
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`))

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(3000)

const checks = {
  title: await page.title(),
  hasCanvas: await page.locator('canvas').count(),
  headline: await page.locator('.hero-content__heading').innerText(),
  cta: await page.locator('.hero-content__cta').isVisible(),
  labels: await page.locator('.hero-content__label').count(),
  blocked: (await page.content()).includes('Blocked request'),
}

await page.screenshot({ path: '/workspace/ref-verify-idle.png', fullPage: false })

// Hover power transformer area
await page.mouse.move(280, 380)
await page.waitForTimeout(900)
await page.screenshot({ path: '/workspace/ref-verify-hover.png', fullPage: false })

// Parallax
await page.mouse.move(1600, 400)
await page.waitForTimeout(500)
await page.screenshot({ path: '/workspace/ref-verify-parallax.png', fullPage: false })

const result = { checks, errors, logs: logs.filter((l) => !l.includes('DevTools')) }
writeFileSync('/workspace/ref-verify.json', JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))

await browser.close()
