import { useState, useEffect } from 'react'
import { HeroProvider } from '../../context/HeroContext'
import { usePerformanceManager, useReducedMotion } from '../../hooks/usePerformanceManager'
import { EcosystemScene } from '../three/EcosystemScene'
import { HeroContent } from './HeroContent'
import './ParticleHero.css'

export function ParticleHero() {
  const performance = usePerformanceManager()
  const reducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  )
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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
    <HeroProvider performance={performance} reducedMotion={reducedMotion} isMobile={isMobile}>
      <section className="particle-hero" aria-label="Rugged Monitoring Hero">
        <div className="particle-hero__background" />

        {webglSupported ? (
          <div className="particle-hero__canvas">
            <EcosystemScene />
          </div>
        ) : (
          <div className="particle-hero__fallback" />
        )}

        <HeroContent />
      </section>
    </HeroProvider>
  )
}
