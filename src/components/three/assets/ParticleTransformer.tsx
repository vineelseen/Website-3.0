import { ASSET_CONFIGS } from '../../../config/assets'
import { ParticleAsset } from '../ParticleAsset'
import type { AssetConfig } from '../../../types'

const config = ASSET_CONFIGS.find((a: AssetConfig) => a.id === 'power-transformer')!

/** Power Transformer particle digital twin */
export function ParticleTransformer() {
  return <ParticleAsset config={config} />
}
