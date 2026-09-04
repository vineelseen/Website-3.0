import { ASSET_CONFIGS } from '../../../config/assets'
import { ParticleAsset } from '../ParticleAsset'

const config = ASSET_CONFIGS.find((a) => a.id === 'gis')!

/** Gas Insulated Switchgear particle digital twin */
export function ParticleGIS() {
  return <ParticleAsset config={config} />
}
