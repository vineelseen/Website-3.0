import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useHeroContext } from '../../context/HeroContext'
import { RM_EYE_POSITION } from '../../config/assets'
import { rmEyeVertexShader, rmEyeFragmentShader } from '../../shaders'
import { textToParticles } from '../../utils/textToParticles'
import { damp } from '../../utils/easing'
import { RM_COLORS } from '../../constants/colors'

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex)
  return new THREE.Vector3(c.r, c.g, c.b)
}

export function RMEyeParticles() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const receivePulseRef = useRef(0)

  const { rmEyePulseRef, reducedMotion, performance } = useHeroContext()

  const particleData = useMemo(() => {
    const density = performance.particleMultiplier
    const step = density < 0.5 ? 0.55 : density < 0.8 ? 0.8 : 1
    return textToParticles('RM EYE', {
      font: '600 52px Orbitron, sans-serif',
      fontSize: 52,
      density: step,
      scale: 0.0058,
    })
  }, [performance.particleMultiplier])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(particleData.randoms, 1))
    return geo
  }, [particleData])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: rmEyeVertexShader,
        fragmentShader: rmEyeFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uReceivePulse: { value: 0 },
          uReducedMotion: { value: 0 },
          uColorPrimary: { value: hexToVec3(RM_COLORS.primary) },
          uColorHighlight: { value: hexToVec3(RM_COLORS.highlight) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )

  materialRef.current = material

  useFrame((state, delta) => {
    const mat = materialRef.current
    if (!mat) return

    const pulse = rmEyePulseRef.current
    if (pulse.target > 0) {
      pulse.value = damp(pulse.value, pulse.target, 8, delta)
      if (pulse.value > 0.85) pulse.target = 0
    } else {
      pulse.value = damp(pulse.value, 0, 4, delta)
    }

    receivePulseRef.current = pulse.value

    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uReceivePulse.value = receivePulseRef.current
    mat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0
  })

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  return (
    <group position={RM_EYE_POSITION} renderOrder={3}>
      <points geometry={geometry} material={material} renderOrder={3} />
    </group>
  )
}
