import type { ReactNode } from 'react'
import { usePerformanceManager, useReducedMotion } from '../../hooks/usePerformanceManager'

interface PerformanceManagerProps {
  children: (settings: {
    performance: ReturnType<typeof usePerformanceManager>
    reducedMotion: boolean
  }) => ReactNode
}

/**
 * Provides adaptive quality settings based on device capabilities.
 * Wrap hero content to access performance tier configuration.
 */
export function PerformanceManager({ children }: PerformanceManagerProps) {
  const performance = usePerformanceManager()
  const reducedMotion = useReducedMotion()
  return <>{children({ performance, reducedMotion })}</>
}
