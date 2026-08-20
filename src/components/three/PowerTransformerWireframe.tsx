import { useMemo, useEffect } from 'react'
import { POWER_TRANSFORMER_STAGE4 } from '../../config/powerTransformerStage4'
import { buildPowerTransformerParts } from '../../geometry/assets/powerTransformer'
import { buildMergedGeometry } from '../../geometry/geometryBuilder'

/** Checkpoint 4A — wireframe geometry inspection (not used in final hero) */
export function PowerTransformerWireframe() {
  const geometry = useMemo(() => buildMergedGeometry(buildPowerTransformerParts()), [])

  useEffect(() => () => geometry.dispose(), [geometry])

  const { position, rotation, scale } = POWER_TRANSFORMER_STAGE4

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.85} />
      </mesh>
    </group>
  )
}
