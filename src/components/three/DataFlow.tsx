import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AssetConfig } from '../../types'
import { RM_EYE_POSITION } from '../../config/assets'
import { useHeroContext } from '../../context/HeroContext'
import { dataFlowVertexShader, dataFlowFragmentShader } from '../../shaders'
import { createManhattanPath, samplePath } from '../../utils/circuitPaths'
import { damp } from '../../utils/easing'
import { RM_COLORS } from '../../constants/colors'

interface DataFlowProps {
  sourceConfig: AssetConfig
}

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex)
  return new THREE.Vector3(c.r, c.g, c.b)
}

export function DataFlow({ sourceConfig }: DataFlowProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const activeRef = useRef(0)
  const opacityRef = useRef(0.06)

  const { hoveredAssetId, activeDataAssetId, reducedMotion, performance } = useHeroContext()

  const isActive = hoveredAssetId === sourceConfig.id
  const isPulsing = activeDataAssetId === sourceConfig.id

  const { geometry, material } = useMemo(() => {
    const from = new THREE.Vector3(...sourceConfig.position)
    const to = new THREE.Vector3(...RM_EYE_POSITION)
    const waypoints = createManhattanPath(from, to)
    const count = Math.floor(35 * performance.particleMultiplier)
    const sampled = samplePath(waypoints, count)

    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) phases[i] = Math.random()

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(sampled.positions, 3))
    geo.setAttribute('aProgress', new THREE.BufferAttribute(sampled.along, 1))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(sampled.randoms, 1))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

    const mat = new THREE.ShaderMaterial({
      vertexShader: dataFlowVertexShader,
      fragmentShader: dataFlowFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 1 },
        uActive: { value: 0 },
        uOpacity: { value: 0.06 },
        uReducedMotion: { value: 0 },
        uColor: { value: hexToVec3(RM_COLORS.highlight) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return { geometry: geo, material: mat }
  }, [sourceConfig.position, performance.particleMultiplier])

  materialRef.current = material

  useFrame((state, delta) => {
    const mat = materialRef.current
    if (!mat) return

    const targetActive = isActive || isPulsing ? 1 : 0
    activeRef.current = damp(activeRef.current, targetActive, 5, delta)

    const targetOpacity = isActive ? 0.18 : 0.06
    opacityRef.current = damp(opacityRef.current, targetOpacity, 4, delta)

    const targetSpeed = isActive ? 2.5 : 1
    const currentSpeed = mat.uniforms.uSpeed.value as number
    mat.uniforms.uSpeed.value = damp(currentSpeed, targetSpeed, 4, delta)

    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uActive.value = activeRef.current
    mat.uniforms.uOpacity.value = opacityRef.current
    mat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0
  })

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  return <points geometry={geometry} material={material} renderOrder={2} />
}
