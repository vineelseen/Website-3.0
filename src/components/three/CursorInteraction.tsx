import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useHeroContext } from '../../context/HeroContext'

/** Tracks normalized pointer position for parallax and proximity effects */
export function CursorInteraction() {
  const { setMouse } = useHeroContext()
  const { gl } = useThree()

  useEffect(() => {
    const canvas = gl.domElement

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      setMouse(x, y)
    }

    canvas.addEventListener('pointermove', onMove, { passive: true })
    return () => canvas.removeEventListener('pointermove', onMove)
  }, [gl, setMouse])

  return null
}
