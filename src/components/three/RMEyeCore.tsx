import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useHeroContext } from '../../context/HeroContext'
import { RM_EYE_POSITION } from '../../config/assets'
import { buildRMEyeParts } from '../../geometry/rmEye'
import { geometryToParticles } from '../../utils/geometryToParticles'
import { particleVertexShader, particleFragmentShader } from '../../shaders/particleShaders'
import { damp } from '../../utils/easing'
import { RM_COLORS } from '../../constants/colors'

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex)
  return new THREE.Vector3(c.r, c.g, c.b)
}

export function RMEyeCore() {
  const groupRef = useRef<THREE.Group>(null)
  const coreMatRef = useRef<THREE.ShaderMaterial>(null)
  const orbitMatRef = useRef<THREE.ShaderMaterial>(null)
  const breathRef = useRef(0)

  const { rmEyePulse, reducedMotion, performance } = useHeroContext()

  const coreParticleData = useMemo(() => {
    const parts = buildRMEyeParts()
    const coreCount = Math.floor(1400 * performance.particleMultiplier)
    return geometryToParticles(parts, coreCount)
  }, [performance.particleMultiplier])

  const orbitParticleData = useMemo(() => {
    const orbitParts = buildRMEyeParts().filter((_, i) => i >= 2)
    const orbitCount = Math.floor(600 * performance.particleMultiplier)
    return geometryToParticles(orbitParts, orbitCount)
  }, [performance.particleMultiplier])

  const buildPointsGeo = (data: ReturnType<typeof geometryToParticles>) => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(data.positions, 3))
    geo.setAttribute('aNormal', new THREE.BufferAttribute(data.normals, 3))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(data.randoms, 1))
    geo.setAttribute('aWeight', new THREE.BufferAttribute(data.weights, 1))
    return geo
  }

  const corePointsGeometry = useMemo(
    () => buildPointsGeo(coreParticleData),
    [coreParticleData],
  )
  const orbitPointsGeometry = useMemo(
    () => buildPointsGeo(orbitParticleData),
    [orbitParticleData],
  )

  const makeMaterial = (intensity: number) =>
    new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uHover: { value: 0 },
        uPushBack: { value: 0 },
        uMouse: { value: new THREE.Vector3() },
        uProximityRadius: { value: 0 },
        uEnableProximity: { value: 0 },
        uReducedMotion: { value: 0 },
        uColorPrimary: { value: hexToVec3(RM_COLORS.primary) },
        uColorHighlight: { value: hexToVec3(RM_COLORS.highlight) },
        uColorAccent: { value: hexToVec3(RM_COLORS.accent) },
        uColorBright: { value: hexToVec3(RM_COLORS.particleBright) },
        uHalo: { value: 0.25 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

  const coreMaterial = useMemo(() => makeMaterial(0.5), [])
  const orbitMaterial = useMemo(() => makeMaterial(0.3), [])

  coreMatRef.current = coreMaterial
  orbitMatRef.current = orbitMaterial

  useFrame((state, delta) => {
    const coreMat = coreMatRef.current
    const orbitMat = orbitMatRef.current
    if (!coreMat || !orbitMat || !groupRef.current) return

    const breath = reducedMotion
      ? 0.45
      : 0.38 + Math.sin(state.clock.elapsedTime * 0.55) * 0.07

    breathRef.current = damp(breathRef.current, breath + rmEyePulse * 0.3, 5, delta)

    const t = state.clock.elapsedTime
    coreMat.uniforms.uTime.value = t
    coreMat.uniforms.uIntensity.value = breathRef.current
    coreMat.uniforms.uHalo.value = 0.25 + rmEyePulse * 0.45
    coreMat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0

    orbitMat.uniforms.uTime.value = t
    orbitMat.uniforms.uIntensity.value = breathRef.current * 0.65
    orbitMat.uniforms.uHalo.value = 0.15 + rmEyePulse * 0.3
    orbitMat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0

    if (!reducedMotion) {
      groupRef.current.rotation.y = t * 0.08
    }

    const scale = 1 + rmEyePulse * 0.05
    groupRef.current.scale.setScalar(damp(groupRef.current.scale.x, scale, 8, delta))
  })

  useEffect(() => {
    return () => {
      corePointsGeometry.dispose()
      orbitPointsGeometry.dispose()
      coreMaterial.dispose()
      orbitMaterial.dispose()
    }
  }, [corePointsGeometry, orbitPointsGeometry, coreMaterial, orbitMaterial])

  return (
    <group ref={groupRef} position={RM_EYE_POSITION}>
      <points geometry={corePointsGeometry} material={coreMaterial} />
      <points geometry={orbitPointsGeometry} material={orbitMaterial} />
    </group>
  )
}
