/** Stage 4 — power transformer placement (camera locked at [0,0,12], fov 42) */
export const POWER_TRANSFORMER_STAGE4 = {
  /** Upper-left placement — cleared above headline (top ~615px at 1080p) */
  position: [-5.55, 1.58, -1.32] as [number, number, number],
  rotation: [-0.06, 0.5, 0] as [number, number, number],
  /** Stage 4A debug scale */
  scale: 1.42,
  particleCount: 4200,
  idleIntensity: 0.52,
  labelText: 'POWER TRANSFORMER',
  label: { left: '7%', top: '16%' },
} as const

/** Stage 4A only — geometry debug. Stage 4B (particles) disabled until approved. */
export const POWER_TRANSFORMER_RENDER_MODE: 'wireframe' | 'particles' = 'wireframe'
