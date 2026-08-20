import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { AssetConfig } from '../../types'
import { useHeroContext } from '../../context/HeroContext'
import { RM_EYE_POSITION } from '../../config/assets'
import { streamVertexShader, streamFragmentShader } from '../../shaders/particleShaders'
import { damp } from '../../utils/easing'
import { RM_COLORS } from '../../constants/colors'

interface DataStreamProps {
  sourceConfig: AssetConfig
  particleCount?: number
}

function createCurvedPath(
  from: THREE.Vector3,
  to: THREE.Vector3,
): THREE.CatmullRomCurve3 {
  const mid = new THREE.Vector3().lerpVectors(from, to, 0.5)
  mid.y += 0.4 + Math.random() * 0.3
  mid.x += (Math.random() - 0.5) * 0.5

  const ctrl1 = new THREE.Vector3().lerpVectors(from, mid, 0.5)
  ctrl1.y += 0.2
  const ctrl2 = new THREE.Vector3().lerpVectors(mid, to, 0.5)
  ctrl2.y += 0.15

  return new THREE.CatmullRomCurve3([from, ctrl1, mid, ctrl2, to])
}

export function DataStream({ sourceConfig, particleCount = 80 }: DataStreamProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const opacityRef = useRef(0.04)

  const { hoveredAssetId, dataPulseAssetId, reducedMotion, performance } = useHeroContext()

  const isActive = hoveredAssetId === sourceConfig.id
  const isPulsing = dataPulseAssetId === sourceConfig.id

  const count = Math.floor(particleCount * performance.particleMultiplier)

  const { geometry, material } = useMemo(() => {
    const from = new THREE.Vector3(...sourceConfig.position)
    const to = new THREE.Vector3(...RM_EYE_POSITION)
    const curve = createCurvedPath(from, to)

    const positions = new Float32Array(count * 3)
    const progresses = new Float32Array(count)
    const randoms = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const t = i / count
      const point = curve.getPoint(t)
      const i3 = i * 3
      positions[i3] = point.x
      positions[i3 + 1] = point.y
      positions[i3 + 2] = point.z
      progresses[i] = t
      randoms[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aProgress', new THREE.BufferAttribute(progresses, 1))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

    const color = new THREE.Color(RM_COLORS.accent)

    const mat = new THREE.ShaderMaterial({
      vertexShader: streamVertexShader,
      fragmentShader: streamFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.04 },
        uSpeed: { value: 1 },
        uPulse: { value: 0 },
        uReducedMotion: { value: 0 },
        uColor: { value: new THREE.Vector3(color.r, color.g, color.b) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return { geometry: geo, material: mat }
  }, [sourceConfig.position, count])

  materialRef.current = material

  useFrame((state, delta) => {
    const mat = materialRef.current
    if (!mat) return

    const targetOpacity = isActive ? 0.35 : 0.04
    opacityRef.current = damp(opacityRef.current, targetOpacity, 5, delta)

    const targetSpeed = isActive ? 3.5 : 1
    const currentSpeed = mat.uniforms.uSpeed.value as number
    mat.uniforms.uSpeed.value = damp(currentSpeed, targetSpeed, 4, delta)

    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uOpacity.value = opacityRef.current
    mat.uniforms.uPulse.value = isPulsing ? 1 : damp(mat.uniforms.uPulse.value as number, 0, 6, delta)
    mat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0
  })

  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  return <points geometry={geometry} material={material} />
}
