import { POWER_TRANSFORMER_RENDER_MODE } from '../../config/powerTransformerStage4'
import { PowerTransformerParticles } from './PowerTransformerParticles'
import { PowerTransformerWireframe } from './PowerTransformerWireframe'

export function PowerTransformerStage4() {
  if (POWER_TRANSFORMER_RENDER_MODE === 'wireframe') {
    return <PowerTransformerWireframe />
  }
  return <PowerTransformerParticles />
}
