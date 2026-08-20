/**
 * Stage 3 — RM EYE particle typography placement.
 * Tuned for 1920×1080 with Stage 2 headline locked at top: 57%.
 */
export const RM_EYE_TYPOGRAPHY_POSITION: [number, number, number] = [0, 0.82, 0]

/** Target ~16% viewport width at z=0 with camera at [0,0,12], fov 42 */
export const RM_EYE_TYPOGRAPHY_PARTICLE_OPTIONS = {
  font: '700 54px Orbitron, sans-serif',
  fontSize: 54,
  density: 1,
  scale: 0.0098,
} as const
