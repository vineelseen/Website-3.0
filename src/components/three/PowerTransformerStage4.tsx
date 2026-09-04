import { POWER_TRANSFORMER_RENDER_MODE } from '../../config/powerTransformerStage4'
import { PowerTransformerParticles } from './PowerTransformerParticles'
import { PowerTransformerWireframe } from './PowerTransformerWireframe'

/** Stage 4 — checkpoint 4A wireframe geometry (4B particles disabled until approved) */
export function PowerTransformerStage4() {
  if (POWER_TRANSFORMER_RENDER_MODE === 'wireframe') {
    return <PowerTransformerWireframe />
  }
  return <PowerTransformerParticles />
}
