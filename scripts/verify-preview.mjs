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

// Simulate Cursor VM preview host access
const blockedHostCheck = await fetch(url, {
  headers: { Host: 'cursor-vm-preview-abc123.cursor.sh' },
}).then(async (res) => ({
  status: res.status,
  body: (await res.text()).slice(0, 200),
  blocked: (await res.text()).includes('Blocked request'),
})).catch((e) => ({ error: e.message }))

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(2500)

const checks = {
  title: await page.title(),
  hasCanvas: await page.locator('canvas').count(),
  hasHeadline: await page.locator('.hero-content__heading').isVisible(),
  headlineText: await page.locator('.hero-content__heading').innerText(),
  hasCta: await page.locator('.hero-content__cta').isVisible(),
  blockedHostCheck,
}

await page.screenshot({ path: '/workspace/preview-verify.png', fullPage: false })

// Hover transformer area
await page.mouse.move(150, 550)
await page.waitForTimeout(800)
await page.screenshot({ path: '/workspace/preview-hover.png', fullPage: false })

// Parallax
await page.mouse.move(1200, 300)
await page.waitForTimeout(500)

const result = { checks, errors, logs: logs.filter((l) => !l.includes('React DevTools')) }
writeFileSync('/workspace/preview-verify.json', JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))

await browser.close()
