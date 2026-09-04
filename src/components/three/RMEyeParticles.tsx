import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RM_EYE_PARTICLES_POSITION } from '../../config/rmEyeTypography'
import {
  rmEyeParticleBasicFragmentShader,
  rmEyeParticleShaderFragment,
  rmEyeParticleShaderVertex,
} from '../../shaders/rmEyeParticles'
import { createRmEyeParticleMask } from '../../utils/rmEyeParticleMask'

/**
 * Stage 3 debug pipeline:
 *   'basic'  — THREE.PointsMaterial (geometry proof)
 *   'shader' — ShaderMaterial test color
 *   'breath' — ShaderMaterial + breathing
 */
const RM_EYE_RENDER_MODE: 'basic' | 'shader' | 'breath' = 'breath'

export function RMEyeParticles() {
  const basicMaterialRef = useRef<THREE.PointsMaterial>(null)
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null)

  const particleData = useMemo(() => createRmEyeParticleMask(), [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(particleData.positions, 3))
    geo.setAttribute('aRandom', new THREE.Float32BufferAttribute(particleData.randoms, 1))
    return geo
  }, [particleData])

  const basicMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0x2563eb,
        size: 0.012,
        transparent: true,
        opacity: 1,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    [],
  )

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: rmEyeParticleShaderVertex,
        fragmentShader:
          RM_EYE_RENDER_MODE === 'breath'
            ? rmEyeParticleShaderFragment
            : rmEyeParticleBasicFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uReceivePulse: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
      }),
    [],
  )

  basicMaterialRef.current = basicMaterial
  shaderMaterialRef.current = shaderMaterial

  useFrame((state) => {
    if (RM_EYE_RENDER_MODE !== 'breath') return
    const mat = shaderMaterialRef.current
    if (!mat) return
    mat.uniforms.uTime.value = state.clock.elapsedTime
  })

  useEffect(() => {
    return () => {
      geometry.dispose()
      basicMaterial.dispose()
      shaderMaterial.dispose()
    }
  }, [geometry, basicMaterial, shaderMaterial])

  if (particleData.count === 0) return null

  const material =
    RM_EYE_RENDER_MODE === 'basic' ? basicMaterial : shaderMaterial

  return (
    <group position={RM_EYE_PARTICLES_POSITION}>
      <points geometry={geometry} material={material} />
    </group>
  )
}
