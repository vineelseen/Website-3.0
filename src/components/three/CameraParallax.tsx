import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useHeroContext } from '../../context/HeroContext'
import { damp } from '../../utils/easing'

export function CameraParallax() {
  const { camera } = useThree()
  const { mouse, performance, reducedMotion } = useHeroContext()
  const currentRot = useRef({ x: 0, y: 0 })

  useFrame((_, delta) => {
    if (reducedMotion || performance.parallaxStrength === 0) return

    const strength = performance.parallaxStrength * 0.012
    const targetY = mouse.x * strength
    const targetX = -mouse.y * strength * 0.4

    currentRot.current.y = damp(currentRot.current.y, targetY, 3, delta)
    currentRot.current.x = damp(currentRot.current.x, targetX, 3, delta)

    camera.rotation.y = currentRot.current.y
    camera.rotation.x = currentRot.current.x
  })

  return null
}
