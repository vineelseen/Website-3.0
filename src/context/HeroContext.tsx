import { createContext, useContext, useCallback, useRef, useState, type MutableRefObject, type ReactNode } from 'react'
import type { AssetId } from '../types'
import type { PerformanceSettings } from '../types'

export interface PulseRef {
  value: number
  target: number
}

interface HeroContextValue {
  performance: PerformanceSettings
  reducedMotion: boolean
  hoveredAssetId: AssetId | null
  setHoveredAssetId: (id: AssetId | null) => void
  rmEyePulseRef: MutableRefObject<PulseRef>
  triggerRmEyePulse: () => void
  activeDataAssetId: AssetId | null
  triggerDataPulse: (id: AssetId) => void
  mouse: { x: number; y: number }
  setMouse: (x: number, y: number) => void
  isMobile: boolean
}

const HeroContext = createContext<HeroContextValue | null>(null)

export function HeroProvider({
  children,
  performance,
  reducedMotion,
  isMobile,
}: {
  children: ReactNode
  performance: PerformanceSettings
  reducedMotion: boolean
  isMobile: boolean
}) {
  const [hoveredAssetId, setHoveredAssetId] = useState<AssetId | null>(null)
  const [activeDataAssetId, setActiveDataAssetId] = useState<AssetId | null>(null)
  const [mouse, setMouseState] = useState({ x: 0, y: 0 })
  const rmEyePulseRef = useRef<PulseRef>({ value: 0, target: 0 })
  const dataTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerRmEyePulse = useCallback(() => {
    rmEyePulseRef.current.target = 1
  }, [])

  const triggerDataPulse = useCallback((id: AssetId) => {
    setActiveDataAssetId(id)
    if (dataTimeout.current) clearTimeout(dataTimeout.current)
    dataTimeout.current = setTimeout(() => setActiveDataAssetId(null), 1200)
  }, [])

  const setMouse = useCallback((x: number, y: number) => {
    setMouseState({ x, y })
  }, [])

  return (
    <HeroContext.Provider
      value={{
        performance,
        reducedMotion,
        hoveredAssetId,
        setHoveredAssetId,
        rmEyePulseRef,
        triggerRmEyePulse,
        activeDataAssetId,
        triggerDataPulse,
        mouse,
        setMouse,
        isMobile,
      }}
    >
      {children}
    </HeroContext.Provider>
  )
}

export function useHeroContext(): HeroContextValue {
  const ctx = useContext(HeroContext)
  if (!ctx) throw new Error('useHeroContext must be used within HeroProvider')
  return ctx
}
