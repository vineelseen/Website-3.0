import { useEffect, useState } from 'react'
import type { PerformanceSettings, QualityLevel } from '../types'

function detectQuality(): QualityLevel {
  if (typeof window === 'undefined') return 'high'

  const isMobile = window.innerWidth < 768
  const lowMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined &&
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory! < 4
  const lowCores = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4

  if (isMobile || lowMemory || lowCores) return 'low'
  if (window.innerWidth < 1200) return 'medium'
  return 'high'
}

function settingsForQuality(quality: QualityLevel, reducedMotion: boolean): PerformanceSettings {
  switch (quality) {
    case 'low':
      return {
        quality,
        particleMultiplier: 0.35,
        enableBloom: false,
        enableProximity: false,
        parallaxStrength: reducedMotion ? 0 : 0.4,
        dpr: [1, 1.25],
      }
    case 'medium':
      return {
        quality,
        particleMultiplier: 0.65,
        enableBloom: true,
        enableProximity: !reducedMotion,
        parallaxStrength: reducedMotion ? 0 : 0.7,
        dpr: [1, 1.5],
      }
    default:
      return {
        quality,
        particleMultiplier: 1,
        enableBloom: true,
        enableProximity: !reducedMotion,
        parallaxStrength: reducedMotion ? 0 : 1,
        dpr: [1, 2],
      }
  }
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

export function usePerformanceManager(): PerformanceSettings {
  const reducedMotion = useReducedMotion()
  const [quality, setQuality] = useState<QualityLevel>(detectQuality)

  useEffect(() => {
    const onResize = () => setQuality(detectQuality())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return settingsForQuality(quality, reducedMotion)
}
