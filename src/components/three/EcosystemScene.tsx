import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ASSET_CONFIGS } from '../../config/assets'
import { useHeroContext } from '../../context/HeroContext'
import { ParticleAsset } from './ParticleAsset'
import { DataStream } from './DataStream'
import { RMEyeCore } from './RMEyeCore'
import { CameraParallax } from './CameraParallax'
import { CursorInteraction } from './CursorInteraction'
import { SceneEnvironment } from './SceneEnvironment'

function EcosystemContent() {
  const { performance, isMobile } = useHeroContext()

  const visibleAssets = useMemo(() => {
    if (isMobile) {
      return ASSET_CONFIGS.filter((a) => a.mobileVisible)
    }
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

      {visibleAssets.map((config) => (
        <DataStream key={`stream-${config.id}`} sourceConfig={config} />
      ))}

      <RMEyeCore />

      {performance.enableBloom && (
        <EffectComposer multisampling={performance.quality === 'high' ? 4 : 0}>
          <Bloom
            intensity={performance.quality === 'high' ? 0.35 : 0.2}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  )
}

export function EcosystemScene() {
  const { performance } = useHeroContext()

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 50 }}
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
