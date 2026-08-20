import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { POWER_TRANSFORMER_STAGE4 } from '../../config/powerTransformerStage4'
import { buildPowerTransformerParts } from '../../geometry/assets/powerTransformer'
import { RM_COLORS } from '../../constants/colors'
import {
  transformerParticleFragmentShader,
  transformerParticleVertexShader,
} from '../../shaders/transformerParticles'
import { geometryToParticles } from '../../utils/geometryToParticles'

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex)
  return new THREE.Vector3(c.r, c.g, c.b)
}

/** Stage 4B — static particle power transformer */
export function PowerTransformerParticles() {
  const { position, rotation, scale, particleCount, idleIntensity } = POWER_TRANSFORMER_STAGE4

  const particleData = useMemo(() => {
    const data = geometryToParticles(buildPowerTransformerParts(), particleCount)
    console.info(`Power Transformer particle count: ${data.count}`)
    return data
  }, [particleCount])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3))
    geo.setAttribute('aNormal', new THREE.BufferAttribute(particleData.normals, 3))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(particleData.randoms, 1))
    geo.setAttribute('aWeight', new THREE.BufferAttribute(particleData.weights, 1))
    return geo
  }, [particleData])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: transformerParticleVertexShader,
        fragmentShader: transformerParticleFragmentShader,
        uniforms: {
          uIntensity: { value: idleIntensity },
          uColorDark: { value: hexToVec3(RM_COLORS.darkBlue) },
          uColorPrimary: { value: hexToVec3(RM_COLORS.primary) },
          uColorHighlight: { value: hexToVec3(RM_COLORS.highlight) },
          uColorAccent: { value: hexToVec3(RM_COLORS.accent) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [idleIntensity],
  )

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  return (
    <group position={position} rotation={rotation} scale={scale} renderOrder={0}>
      <points geometry={geometry} material={material} renderOrder={0} frustumCulled={false} />
    </group>
  )
}
