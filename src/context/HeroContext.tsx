import { createContext, useContext, useCallback, useRef, useState, type ReactNode } from 'react'
import type { AssetId } from '../types'
import type { PerformanceSettings } from '../types'

interface HeroContextValue {
  performance: PerformanceSettings
  reducedMotion: boolean
  hoveredAssetId: AssetId | null
  setHoveredAssetId: (id: AssetId | null) => void
  rmEyePulse: number
  triggerRmEyePulse: () => void
  dataPulseAssetId: AssetId | null
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
  const [rmEyePulse, setRmEyePulse] = useState(0)
  const [dataPulseAssetId, setDataPulseAssetId] = useState<AssetId | null>(null)
  const [mouse, setMouseState] = useState({ x: 0, y: 0 })
  const pulseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dataTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerRmEyePulse = useCallback(() => {
    setRmEyePulse(1)
    if (pulseTimeout.current) clearTimeout(pulseTimeout.current)
    pulseTimeout.current = setTimeout(() => setRmEyePulse(0), 700)
  }, [])

  const triggerDataPulse = useCallback((id: AssetId) => {
    setDataPulseAssetId(id)
    if (dataTimeout.current) clearTimeout(dataTimeout.current)
    dataTimeout.current = setTimeout(() => setDataPulseAssetId(null), 800)
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
        rmEyePulse,
        triggerRmEyePulse,
        dataPulseAssetId,
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
