import { useRef, useMemo, useEffect, useCallback, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { AssetConfig } from '../../types'
import { useHeroContext } from '../../context/HeroContext'
import { createPlaceholderGeometry } from '../../utils/placeholderGeometries'
import { sampleParticlesFromGeometry, getBaseParticleCount } from '../../utils/particleGeometry'
import { particleVertexShader, particleFragmentShader } from '../../shaders/particleShaders'
import { damp } from '../../utils/easing'
import { RM_COLORS } from '../../constants/colors'

interface ParticleAssetProps {
  config: AssetConfig
}

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex)
  return new THREE.Vector3(c.r, c.g, c.b)
}

function geometryFromGltfScene(scene: THREE.Object3D, fallback: string): THREE.BufferGeometry {
  const geometries: THREE.BufferGeometry[] = []
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      const geo = mesh.geometry.clone()
      mesh.updateWorldMatrix(true, false)
      geo.applyMatrix4(mesh.matrixWorld)
      geometries.push(geo)
    }
  })
  if (geometries.length === 0) return createPlaceholderGeometry(fallback)
  if (geometries.length === 1) return geometries[0]
  return mergeGeometries(geometries) ?? createPlaceholderGeometry(fallback)
}

function ParticleAssetInner({
  config,
  geometry,
}: {
  config: AssetConfig
  geometry: THREE.BufferGeometry
}) {
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const hoverRef = useRef(0)
  const intensityRef = useRef(config.idleOpacity)

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

  const particleData = useMemo(
    () => sampleParticlesFromGeometry(geometry, particleCount),
    [geometry, particleCount],
  )

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3))
    geo.setAttribute('aNormal', new THREE.BufferAttribute(particleData.normals, 3))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(particleData.randoms, 1))
    return geo
  }, [particleData])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: config.idleOpacity },
        uHover: { value: 0 },
        uPushBack: { value: 0 },
        uMouse: { value: new THREE.Vector3() },
        uProximityRadius: { value: 0.8 },
        uEnableProximity: { value: performance.enableProximity ? 1 : 0 },
        uReducedMotion: { value: reducedMotion ? 1 : 0 },
        uColorPrimary: { value: hexToVec3(RM_COLORS.particleDim) },
        uColorAccent: { value: hexToVec3(RM_COLORS.accent) },
        uHalo: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [config.idleOpacity, performance.enableProximity, reducedMotion])

  materialRef.current = material

  const isHovered = hoveredAssetId === config.id
  const isOtherHovered = hoveredAssetId !== null && hoveredAssetId !== config.id

  useFrame((state, delta) => {
    const mat = materialRef.current
    if (!mat) return

    const targetHover = isHovered ? 1 : 0
    hoverRef.current = damp(hoverRef.current, targetHover, 6, delta)

    const targetIntensity = isHovered
      ? config.hoverIntensity
      : config.idleOpacity + Math.sin(state.clock.elapsedTime * 0.5 + config.position[0]) * 0.03

    intensityRef.current = damp(intensityRef.current, targetIntensity, 5, delta)

    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uIntensity.value = intensityRef.current
    mat.uniforms.uHover.value = hoverRef.current
    mat.uniforms.uPushBack.value = isOtherHovered
      ? damp(mat.uniforms.uPushBack.value as number, 1, 4, delta)
      : damp(mat.uniforms.uPushBack.value as number, 0, 4, delta)
    mat.uniforms.uHalo.value = hoverRef.current * 0.6
    mat.uniforms.uMouse.value.set(mouse.x * 4, mouse.y * 2.5, 0)
    mat.uniforms.uEnableProximity.value = performance.enableProximity ? 1 : 0
    mat.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0

    if (groupRef.current && !reducedMotion) {
      const targetRotY =
        Math.atan2(1.8 - config.position[0], -2.5 - config.position[2]) * 0.05
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        config.rotation[1] + targetRotY,
        0.02,
      )
    }
  })

  const handlePointerOver = useCallback(() => {
    setHoveredAssetId(config.id)
    triggerRmEyePulse()
    triggerDataPulse(config.id)
  }, [config.id, setHoveredAssetId, triggerRmEyePulse, triggerDataPulse])

  const handlePointerOut = useCallback(() => {
    setHoveredAssetId(null)
  }, [setHoveredAssetId])

  useEffect(() => {
    return () => {
      pointsGeometry.dispose()
      material.dispose()
    }
  }, [pointsGeometry, material])

  return (
    <group
      ref={groupRef}
      position={config.position}
      rotation={config.rotation}
      scale={config.scale}
    >
      <points geometry={pointsGeometry} material={material} />

      <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} visible={false}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
}

function GltfParticleAsset({ config }: { config: AssetConfig }) {
  const { scene } = useGLTF(config.model!)
  const geometry = useMemo(
    () => geometryFromGltfScene(scene, config.placeholder),
    [scene, config.placeholder],
  )

  useEffect(() => () => geometry.dispose(), [geometry])

  return <ParticleAssetInner config={config} geometry={geometry} />
}

function PlaceholderParticleAsset({ config }: { config: AssetConfig }) {
  const geometry = useMemo(
    () => createPlaceholderGeometry(config.placeholder),
    [config.placeholder],
  )

  useEffect(() => () => geometry.dispose(), [geometry])

  return <ParticleAssetInner config={config} geometry={geometry} />
}

export function ParticleAsset({ config }: ParticleAssetProps) {
  if (config.model) {
    return (
      <Suspense fallback={<PlaceholderParticleAsset config={config} />}>
        <GltfParticleAsset config={config} />
      </Suspense>
    )
  }

  return <PlaceholderParticleAsset config={config} />
}

export function preloadAssetModels(urls: string[]) {
  urls.forEach((url) => {
    if (url) useGLTF.preload(url)
  })
}
