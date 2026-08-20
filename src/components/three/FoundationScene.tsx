import { Canvas } from '@react-three/fiber'

/**
 * Stage 1 camera foundation — stable coordinate system for later stages.
 *
 * FOV: 42°
 * Position: [0, 0, 12]
 * Look-at: scene origin (0, 0, 0)
 *
 * Do not animate or add controls in Stage 1.
 */
export const HERO_CAMERA = {
  position: [0, 0, 12] as [number, number, number],
  fov: 42,
  near: 0.1,
  far: 100,
}

export function FoundationScene() {
  return (
    <Canvas
      camera={{
        position: HERO_CAMERA.position,
        fov: HERO_CAMERA.fov,
        near: HERO_CAMERA.near,
        far: HERO_CAMERA.far,
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Stage 1: intentionally empty — no meshes, particles, lights, or helpers */}
    </Canvas>
  )
}
