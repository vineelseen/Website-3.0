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
  label: string
  position: Vector3Tuple
  rotation: Vector3Tuple
  scale: number
  particleDensity: number
  idleOpacity: number
  hoverIntensity: number
  connectionTarget: 'rm-eye'
  depthLayer: 'foreground' | 'midground' | 'background'
  mobileVisible: boolean
  hitbox: Vector3Tuple
  /** Screen-space label position (% from top-left) */
  labelPosition: { left: string; top: string }
}

export interface PerformanceSettings {
  quality: QualityLevel
  particleMultiplier: number
  enableBloom: boolean
  enableProximity: boolean
  parallaxStrength: number
  dpr: [number, number]
}
