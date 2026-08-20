import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ASSET_CONFIGS, RM_EYE_POSITION } from '../../config/assets'
import { useHeroContext } from '../../context/HeroContext'
import { circuitVertexShader, circuitFragmentShader } from '../../shaders'
import { createManhattanPath, samplePath } from '../../utils/circuitPaths'
import { RM_COLORS } from '../../constants/colors'

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex)
  return new THREE.Vector3(c.r, c.g, c.b)
}

export function CircuitNetwork() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const { reducedMotion, performance, isMobile } = useHeroContext()

  const { geometry, material } = useMemo(() => {
    const visibleConfigs = isMobile
      ? ASSET_CONFIGS.filter((a) => a.mobileVisible)
      : ASSET_CONFIGS

    const traceCount = Math.floor(28 * performance.particleMultiplier)
    const allPositions: number[] = []
    const allRandoms: number[] = []
    const allAlong: number[] = []

    for (const config of visibleConfigs) {
      const from = new THREE.Vector3(...config.position)
      const hub = new THREE.Vector3(...RM_EYE_POSITION)
      hub.x += (Math.random() - 0.5) * 0.08
      hub.y += (Math.random() - 0.5) * 0.06
      const waypoints = createManhattanPath(from, hub)
      const sampled = samplePath(waypoints, traceCount)
      allPositions.push(...sampled.positions)
      allRandoms.push(...sampled.randoms)
      allAlong.push(...sampled.along)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(allPositions, 3))
    geo.setAttribute('aRandom', new THREE.Float32BufferAttribute(allRandoms, 1))
    geo.setAttribute('aAlong', new THREE.Float32BufferAttribute(allAlong, 1))

    const mat = new THREE.ShaderMaterial({
      vertexShader: circuitVertexShader,
      fragmentShader: circuitFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0.17 },
        uActive: { value: 0 },
        uReducedMotion: { value: 0 },
        uColor: { value: hexToVec3(RM_COLORS.darkBlue) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return { geometry: geo, material: mat }
  }, [performance.particleMultiplier, isMobile])

  materialRef.current = material

  useFrame((state) => {
    const mat = materialRef.current
    if (!mat) return
    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0
  })

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  return <points geometry={geometry} material={material} renderOrder={1} />
}
