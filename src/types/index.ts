import type { Vector3Tuple } from 'three'

export type QualityLevel = 'high' | 'medium' | 'low'

export type AssetId =
  | 'power-transformer'
  | 'dry-type-transformer'
  | 'gis'
  | 'ais'
  | 'circuit-breaker'
  | 'rotating-machine'
  | 'power-cables'
  | 'shunt-reactor'
  | 'capacitor-bank'

export interface AssetConfig {
  id: AssetId
  name: string
  /** Configurable GLB/GLTF model URL — swap in production assets without code changes */
  model?: string
  position: Vector3Tuple
  rotation: Vector3Tuple
  scale: number
  particleDensity: number
  idleOpacity: number
  hoverIntensity: number
  connectionTarget: 'rm-eye'
  /** Depth layer for parallax separation */
  depthLayer: 'foreground' | 'midground' | 'background'
  /** Show on mobile (below 768px) */
  mobileVisible: boolean
  /** Placeholder geometry key when no model is loaded */
  placeholder: string
}

export interface PerformanceSettings {
  quality: QualityLevel
  particleMultiplier: number
  enableBloom: boolean
  enableProximity: boolean
  parallaxStrength: number
  dpr: [number, number]
}

export interface InteractionState {
  hoveredAssetId: AssetId | null
  proximityAssetId: AssetId | null
  mouse: { x: number; y: number }
  rmEyePulse: number
  dataPulseAssetId: AssetId | null
}
