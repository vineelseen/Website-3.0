import { RM_COLORS } from '../../constants/colors'

export function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={[RM_COLORS.background]} />
      <fogExp2 attach="fog" args={[RM_COLORS.background, 0.02]} />
    </>
  )
}
