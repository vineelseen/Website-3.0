/** Stage 4 — power transformer placement (camera locked at [0,0,12], fov 42) */
export const POWER_TRANSFORMER_STAGE4 = {
  position: [-5.05, 1.02, -1.75] as [number, number, number],
  rotation: [-0.06, 0.58, 0] as [number, number, number],
  scale: 1.52,
  particleCount: 4200,
  idleIntensity: 0.52,
  labelText: 'POWER TRANSFORMER',
  label: { left: '7%', top: '16%' },
} as const

/** Toggle wireframe geometry inspection (4A) vs particle cloud (4B) */
export const POWER_TRANSFORMER_RENDER_MODE: 'wireframe' | 'particles' = 'particles'
