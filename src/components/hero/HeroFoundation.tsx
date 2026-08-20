import { useEffect, useState } from 'react'
import { FoundationScene } from '../three/FoundationScene'
import { HeroTypography } from './HeroTypography'
import './HeroFoundation.css'

/**
 * Stage 1–2 hero foundation.
 *
 * Layer order:
 *   1. CSS background gradient
 *   2. Three.js canvas (empty for now)
 *   3. HTML headline + CTA (Stage 2)
 *   4. RM EYE (Stage 3 — future)
 */
export function HeroFoundation() {
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      setWebglSupported(!!gl)
    } catch {
      setWebglSupported(false)
    }
  }, [])

  return (
    <section className="hero-foundation" aria-label="Rugged Monitoring Hero">
      <div className="hero-foundation__background" aria-hidden="true" />

      {webglSupported && (
        <div className="hero-foundation__canvas">
          <FoundationScene />
        </div>
      )}

      <div className="hero-foundation__content">
        <HeroTypography />
      </div>
    </section>
  )
}
