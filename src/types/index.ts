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
  position: Vector3Tuple
  rotation: Vector3Tuple
  scale: number
  particleDensity: number
  idleOpacity: number
  hoverIntensity: number
  connectionTarget: 'rm-eye'
  depthLayer: 'foreground' | 'midground' | 'background'
  mobileVisible: boolean
  /** Invisible hitbox dimensions for pointer interaction */
  hitbox: Vector3Tuple
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
