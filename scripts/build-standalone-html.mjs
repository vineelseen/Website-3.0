import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const outDir = path.join(root, 'standalone')

let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const cssMatch = html.match(/href="(\/assets\/[^"]+\.css)"/)
const jsMatch = html.match(/src="(\/assets\/[^"]+\.js)"/)

if (!cssMatch || !jsMatch) {
  console.error('Run `npm run build` first. Could not find CSS/JS in dist/index.html')
  process.exit(1)
}

const css = fs.readFileSync(path.join(dist, cssMatch[1].slice(1)), 'utf8')
const js = fs.readFileSync(path.join(dist, jsMatch[1].slice(1)), 'utf8')

html = html.replace(/<link rel="stylesheet"[^>]*>/, `<style>\n${css}\n</style>`)
html = html.replace(
  /<script type="module"[^>]*><\/script>/,
  `<script>\n${js}\n</script>`,
)

const favicon = fs.readFileSync(path.join(dist, 'favicon.svg'), 'utf8')
const faviconData = `data:image/svg+xml;base64,${Buffer.from(favicon).toString('base64')}`
html = html.replace(/href="\/favicon\.svg"/, `href="${faviconData}"`)

const note = `<!--
  Rugged Monitoring — RM Home Page standalone bundle
  Generated: ${new Date().toISOString()}
  Note: Images, videos, and interactive embeds load from rmbeta.wpenginepowered.com (internet required).
  Open: double-click this file, or serve locally with: npx serve standalone
-->
`

html = html.replace('<body>', `<body>${note}`)

fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'rm-homepage-standalone.html')
fs.writeFileSync(outPath, html)

const sizeMb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2)
console.log(`Standalone HTML written to ${outPath} (${sizeMb} MB)`)
