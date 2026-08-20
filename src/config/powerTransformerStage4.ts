/** Stage 4 — power transformer placement (camera locked at [0,0,12], fov 42) */
export const POWER_TRANSFORMER_STAGE4 = {
  /** Upper-left three-quarter placement tuned for 1920×1080 debug inspection */
  position: [-4.95, 0.95, -1.5] as [number, number, number],
  rotation: [-0.05, 0.52, 0] as [number, number, number],
  /** Stage 4A debug scale — ~29% viewport width, ~40% height */
  scale: 1.42,
  particleCount: 4200,
  idleIntensity: 0.52,
  labelText: 'POWER TRANSFORMER',
  label: { left: '7%', top: '16%' },
} as const

/** Stage 4A only — geometry debug. Stage 4B (particles) disabled until approved. */
export const POWER_TRANSFORMER_RENDER_MODE: 'wireframe' | 'particles' = 'wireframe'
