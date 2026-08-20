import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  RM_EYE_TYPOGRAPHY_PARTICLE_OPTIONS,
  RM_EYE_TYPOGRAPHY_POSITION,
} from '../../config/rmEyeTypography'
import { RM_COLORS } from '../../constants/colors'
import { useReducedMotion } from '../../hooks/usePerformanceManager'
import {
  rmEyeTypographyFragmentShader,
  rmEyeTypographyVertexShader,
} from '../../shaders/rmEyeTypography'
import { textToParticles } from '../../utils/textToParticles'

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex)
  return new THREE.Vector3(c.r, c.g, c.b)
}

/**
 * Stage 3 — RM EYE particle typography with GPU breathing.
 * Updates only uTime (+ uReducedMotion) per frame — no React state animation.
 */
export function RMEyeTypography() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const reducedMotion = useReducedMotion()
  const [fontReady, setFontReady] = useState(false)

  useEffect(() => {
    let active = true
    document.fonts.load('700 54px Orbitron').then(() => {
      if (active) setFontReady(true)
    })
    return () => {
      active = false
    }
  }, [])

  const particleData = useMemo(() => {
    if (!fontReady) return null
    return textToParticles('RM EYE', RM_EYE_TYPOGRAPHY_PARTICLE_OPTIONS)
  }, [fontReady])

  const geometry = useMemo(() => {
    if (!particleData) return null
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(particleData.randoms, 1))
    return geo
  }, [particleData])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: rmEyeTypographyVertexShader,
        fragmentShader: rmEyeTypographyFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uReceivePulse: { value: 0 },
          uReducedMotion: { value: 0 },
          uColorPrimary: { value: hexToVec3(RM_COLORS.primary) },
          uColorHighlight: { value: hexToVec3(RM_COLORS.highlight) },
          uColorAccent: { value: hexToVec3(RM_COLORS.accent) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  materialRef.current = material

  useFrame((state) => {
    const mat = materialRef.current
    if (!mat) return
    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0
  })

  useEffect(() => {
    return () => {
      geometry?.dispose()
      material.dispose()
    }
  }, [geometry, material])

  if (!geometry) return null

  return (
    <group position={RM_EYE_TYPOGRAPHY_POSITION}>
      <points geometry={geometry} material={material} />
    </group>
  )
}
