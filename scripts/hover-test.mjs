import { chromium } from 'playwright'
import { writeFileSync } from 'fs'

const url = 'http://localhost:5173/'
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push(e.message))

await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(3000)

// Try multiple hover targets across the canvas for transformer (left), GIS (top), breaker (right)
const targets = [
  { name: 'transformer', x: 120, y: 550 },
  { name: 'gis', x: 520, y: 280 },
  { name: 'breaker', x: 780, y: 620 },
  { name: 'rm-eye', x: 920, y: 420 },
]

const results = []
for (const t of targets) {
  await page.mouse.move(t.x, t.y)
  await page.waitForTimeout(700)
  await page.screenshot({ path: `/workspace/hover-${t.name}.png` })
  results.push({ target: t.name, x: t.x, y: t.y })
}

writeFileSync('/workspace/hover-results.json', JSON.stringify({ results, errors }, null, 2))
console.log(JSON.stringify({ results, errors }, null, 2))
await browser.close()
