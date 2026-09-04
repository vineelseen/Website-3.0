import { ASSET_CONFIGS } from '../../../config/assets'
import { ParticleAsset } from '../ParticleAsset'

const config = ASSET_CONFIGS.find((a) => a.id === 'rotating-machine')!

/** Rotating Machine / Industrial Motor particle digital twin */
export function ParticleMotor() {
  return <ParticleAsset config={config} />
}
