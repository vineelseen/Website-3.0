import { useEffect, useState } from 'react'
import { FoundationScene } from '../three/FoundationScene'
import './HeroFoundation.css'

/**
 * Stage 1 hero — foundation only.
 *
 * Layer order (prepared for later stages):
 *   1. CSS background gradient
 *   2. Three.js particle ecosystem (empty canvas for now)
 *   3. RM EYE (future)
 *   4. HTML headline (future)
 *   5. CTA (future)
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

      {/* Reserved for Stage 4+ HTML layers — intentionally empty in Stage 1 */}
      <div className="hero-foundation__content" aria-hidden="true" />
    </section>
  )
}
