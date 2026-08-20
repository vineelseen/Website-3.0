import { RM_COLORS } from '../../constants/colors'

export function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={[RM_COLORS.backgroundDark]} />
      <fogExp2 attach="fog" args={[RM_COLORS.backgroundDark, 0.035]} />
      <ambientLight intensity={0.15} color={RM_COLORS.backgroundLight} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={0.2}
        color={RM_COLORS.accent}
      />
      <directionalLight
        position={[-3, 2, -5]}
        intensity={0.08}
        color={RM_COLORS.primary}
      />
    </>
  )
}
