import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ASSET_CONFIGS } from '../../config/assets'
import { useHeroContext } from '../../context/HeroContext'
import { ParticleAsset } from './ParticleAsset'
import { CircuitNetwork } from './CircuitNetwork'
import { DataFlow } from './DataFlow'
import { RMEyeParticles } from './RMEyeParticles'
import { CameraParallax } from './CameraParallax'
import { CursorInteraction } from './CursorInteraction'
import { SceneEnvironment } from './SceneEnvironment'

function EcosystemContent() {
  const { isMobile } = useHeroContext()

  const visibleAssets = useMemo(() => {
    if (isMobile) return ASSET_CONFIGS.filter((a) => a.mobileVisible)
    return ASSET_CONFIGS
  }, [isMobile])

  return (
    <>
      <SceneEnvironment />
      <CameraParallax />
      <CursorInteraction />

      {visibleAssets.map((config) => (
        <ParticleAsset key={config.id} config={config} />
      ))}

      <CircuitNetwork />

      {visibleAssets.map((config) => (
        <DataFlow key={`flow-${config.id}`} sourceConfig={config} />
      ))}

      <RMEyeParticles />
    </>
  )
}

export function EcosystemScene() {
  const { performance } = useHeroContext()

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42, near: 0.1, far: 50 }}
      dpr={performance.dpr}
      gl={{
        antialias: performance.quality !== 'low',
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <EcosystemContent />
      </Suspense>
    </Canvas>
  )
}
