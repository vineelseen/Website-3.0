import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useHeroContext } from '../../context/HeroContext'
import { RM_EYE_POSITION } from '../../config/assets'
import { particleVertexShader, particleFragmentShader } from '../../shaders/particleShaders'
import { sampleParticlesFromGeometry } from '../../utils/particleGeometry'
import { damp } from '../../utils/easing'
import { RM_COLORS } from '../../constants/colors'

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex)
  return new THREE.Vector3(c.r, c.g, c.b)
}

export function RMEyeCore() {
  const groupRef = useRef<THREE.Group>(null)
  const coreMatRef = useRef<THREE.ShaderMaterial>(null)
  const ringRefs = useRef<THREE.Mesh[]>([])
  const breathRef = useRef(0)

  const { rmEyePulse, reducedMotion, performance } = useHeroContext()

  const coreGeometry = useMemo(() => {
    const sphere = new THREE.IcosahedronGeometry(0.35, 3)
    const ring1 = new THREE.TorusGeometry(0.55, 0.008, 8, 48)
    const ring2 = new THREE.TorusGeometry(0.7, 0.006, 8, 48)
    ring2.rotateX(Math.PI / 3)
    const disc = new THREE.CircleGeometry(0.2, 24)

    const coreParticles = sampleParticlesFromGeometry(sphere, Math.floor(1200 * performance.particleMultiplier))

    return { coreParticles, ring1, ring2, disc }
  }, [performance.particleMultiplier])

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(coreGeometry.coreParticles.positions, 3))
    geo.setAttribute('aNormal', new THREE.BufferAttribute(coreGeometry.coreParticles.normals, 3))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(coreGeometry.coreParticles.randoms, 1))
    return geo
  }, [coreGeometry])

  const coreMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0.45 },
        uHover: { value: 0 },
        uPushBack: { value: 0 },
        uMouse: { value: new THREE.Vector3() },
        uProximityRadius: { value: 0 },
        uEnableProximity: { value: 0 },
        uReducedMotion: { value: 0 },
        uColorPrimary: { value: hexToVec3(RM_COLORS.primary) },
        uColorAccent: { value: hexToVec3(RM_COLORS.accent) },
        uHalo: { value: 0.3 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [])

  coreMatRef.current = coreMaterial

  useFrame((state, delta) => {
    const mat = coreMatRef.current
    if (!mat || !groupRef.current) return

    const breath = reducedMotion
      ? 0.45
      : 0.4 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08

    breathRef.current = damp(breathRef.current, breath + rmEyePulse * 0.35, 5, delta)

    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uIntensity.value = breathRef.current
    mat.uniforms.uHalo.value = 0.3 + rmEyePulse * 0.5
    mat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0

    // Subtle ring rotation
    ringRefs.current.forEach((ring, i) => {
      if (ring && !reducedMotion) {
        ring.rotation.z += delta * (0.15 + i * 0.05)
        ring.rotation.x += delta * 0.08
      }
    })

    // Pulse scale
    const scale = 1 + rmEyePulse * 0.06
    groupRef.current.scale.setScalar(damp(groupRef.current.scale.x, scale, 8, delta))
  })

  useEffect(() => {
    return () => {
      pointsGeometry.dispose()
      coreMaterial.dispose()
      coreGeometry.ring1.dispose()
      coreGeometry.ring2.dispose()
      coreGeometry.disc.dispose()
    }
  }, [pointsGeometry, coreMaterial, coreGeometry])

  return (
    <group ref={groupRef} position={RM_EYE_POSITION}>
      <points geometry={pointsGeometry} material={coreMaterial} />

      <mesh ref={(el) => { if (el) ringRefs.current[0] = el }} geometry={coreGeometry.ring1}>
        <meshBasicMaterial
          color={RM_COLORS.accent}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={(el) => { if (el) ringRefs.current[1] = el }} geometry={coreGeometry.ring2}>
        <meshBasicMaterial
          color={RM_COLORS.highlight}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh geometry={coreGeometry.disc} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial
          color={RM_COLORS.primary}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
