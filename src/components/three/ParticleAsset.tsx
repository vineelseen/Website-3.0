import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AssetConfig } from '../../types'
import { useHeroContext } from '../../context/HeroContext'
import { PROCEDURAL_ASSETS } from '../../geometry/assets'
import { geometryToParticles, getBaseParticleCount } from '../../utils/geometryToParticles'
import { assetVertexShader, assetFragmentShader } from '../../shaders'
import { damp } from '../../utils/easing'
import { RM_COLORS } from '../../constants/colors'

interface ParticleAssetProps {
  config: AssetConfig
}

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex)
  return new THREE.Vector3(c.r, c.g, c.b)
}

export function ParticleAsset({ config }: ParticleAssetProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const hoverRef = useRef(0)
  const intensityRef = useRef(config.idleOpacity)
  const pushRef = useRef(0)

  const {
    performance,
    reducedMotion,
    hoveredAssetId,
    setHoveredAssetId,
    triggerRmEyePulse,
    triggerDataPulse,
    mouse,
  } = useHeroContext()

  const particleCount = getBaseParticleCount(
    config.particleDensity,
    performance.particleMultiplier,
  )

  const particleData = useMemo(() => {
    const def = PROCEDURAL_ASSETS[config.id]
    return geometryToParticles(def.buildParts(), particleCount)
  }, [config.id, particleCount])

  const pointsGeometry = useMemo(() => {
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
        vertexShader: assetVertexShader,
        fragmentShader: assetFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: config.idleOpacity },
          uHover: { value: 0 },
          uPushBack: { value: 0 },
          uCursor: { value: new THREE.Vector2() },
          uEnableProximity: { value: performance.enableProximity ? 1 : 0 },
          uReducedMotion: { value: reducedMotion ? 1 : 0 },
          uColorDark: { value: hexToVec3(RM_COLORS.darkBlue) },
          uColorPrimary: { value: hexToVec3(RM_COLORS.primary) },
          uColorHighlight: { value: hexToVec3(RM_COLORS.highlight) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [config.idleOpacity, performance.enableProximity, reducedMotion],
  )

  materialRef.current = material

  const isHovered = hoveredAssetId === config.id
  const isOtherHovered = hoveredAssetId !== null && hoveredAssetId !== config.id

  useFrame((state, delta) => {
    const mat = materialRef.current
    if (!mat) return

    hoverRef.current = damp(hoverRef.current, isHovered ? 1 : 0, 5, delta)

    const targetIntensity = isHovered
      ? config.hoverIntensity
      : config.idleOpacity

    intensityRef.current = damp(intensityRef.current, targetIntensity, 5, delta)
    pushRef.current = damp(pushRef.current, isOtherHovered ? 1 : 0, 4, delta)

    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uIntensity.value = intensityRef.current
    mat.uniforms.uHover.value = hoverRef.current
    mat.uniforms.uPushBack.value = pushRef.current
    mat.uniforms.uCursor.value.set(mouse.x, mouse.y)
    mat.uniforms.uEnableProximity.value = performance.enableProximity ? 1 : 0
    mat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0
  })

  const handlePointerOver = useCallback(() => {
    setHoveredAssetId(config.id)
    triggerDataPulse(config.id)
    setTimeout(() => triggerRmEyePulse(), 400)
  }, [config.id, setHoveredAssetId, triggerDataPulse, triggerRmEyePulse])

  const handlePointerOut = useCallback(() => {
    setHoveredAssetId(null)
  }, [setHoveredAssetId])

  useEffect(() => {
    return () => {
      pointsGeometry.dispose()
      material.dispose()
    }
  }, [pointsGeometry, material])

  const [hx, hy, hz] = config.hitbox

  return (
    <group position={config.position} rotation={config.rotation} scale={config.scale}>
      <points geometry={pointsGeometry} material={material} />
      <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} visible={false}>
        <boxGeometry args={[hx, hy, hz]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
}
