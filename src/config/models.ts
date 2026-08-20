import type { AssetId } from '../types'

/**
 * Map each asset ID to its production GLB/GLTF file path.
 * Place optimized models in /public/models/ and reference them here.
 *
 * Example:
 *   'power-transformer': '/models/power-transformer.glb',
 */
export const MODEL_URLS: Partial<Record<AssetId, string>> = {
  // 'power-transformer': '/models/power-transformer.glb',
  // 'dry-type-transformer': '/models/dry-type-transformer.glb',
  // 'gis': '/models/gis.glb',
  // 'ais': '/models/ais.glb',
  // 'circuit-breaker': '/models/circuit-breaker.glb',
  // 'rotating-machine': '/models/rotating-machine.glb',
  // 'power-cables': '/models/power-cables.glb',
  // 'shunt-reactor': '/models/shunt-reactor.glb',
  // 'capacitor-bank': '/models/capacitor-bank.glb',
}
