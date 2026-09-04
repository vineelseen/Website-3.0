import { ASSET_CONFIGS } from '../../../config/assets'
import { ParticleAsset } from '../ParticleAsset'

const config = ASSET_CONFIGS.find((a) => a.id === 'circuit-breaker')!

/** Circuit Breaker particle digital twin */
export function ParticleCircuitBreaker() {
  return <ParticleAsset config={config} />
}
