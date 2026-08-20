import { useMemo, useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { HERO_CAMERA } from './FoundationScene'
import { POWER_TRANSFORMER_STAGE4 } from '../../config/powerTransformerStage4'
import { buildPowerTransformerParts } from '../../geometry/assets/powerTransformer'
import { buildPartGeometries } from '../../geometry/geometryBuilder'

const SOLID_COLOR = 0x2563eb
const WIREFRAME_COLOR = 0x5b9be0

function logTransformerFrustumDebug(group: THREE.Group, camera: THREE.Camera) {
  group.updateMatrixWorld(true)

  const boundingBox = new THREE.Box3().setFromObject(group)
  const frustum = new THREE.Frustum()
  const projection = new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse,
  )
  frustum.setFromProjectionMatrix(projection)

  let minSx = Infinity
  let maxSx = -Infinity
  let minSy = Infinity
  let maxSy = -Infinity

  for (const x of [boundingBox.min.x, boundingBox.max.x]) {
    for (const y of [boundingBox.min.y, boundingBox.max.y]) {
      for (const z of [boundingBox.min.z, boundingBox.max.z]) {
        const projected = new THREE.Vector3(x, y, z).project(camera)
        const sx = (projected.x * 0.5 + 0.5) * window.innerWidth
        const sy = (1 - (projected.y * 0.5 + 0.5)) * window.innerHeight
        minSx = Math.min(minSx, sx)
        maxSx = Math.max(maxSx, sx)
        minSy = Math.min(minSy, sy)
        maxSy = Math.max(maxSy, sy)
      }
    }
  }

  console.info('Power Transformer 4A debug', {
    renderMode: 'wireframe',
    worldPosition: group.position.toArray(),
    worldRotation: group.rotation.toArray(),
    worldScale: group.scale.toArray(),
    boundingBoxMin: boundingBox.min.toArray(),
    boundingBoxMax: boundingBox.max.toArray(),
    inCameraFrustum: frustum.intersectsBox(boundingBox),
    screenBoundsPx: {
      minX: Math.round(minSx),
      maxX: Math.round(maxSx),
      minY: Math.round(minSy),
      maxY: Math.round(maxSy),
      width: Math.round(maxSx - minSx),
      height: Math.round(maxSy - minSy),
      centerX: Math.round((minSx + maxSx) / 2),
      centerY: Math.round((minSy + maxSy) / 2),
      widthPct: +(((maxSx - minSx) / window.innerWidth) * 100).toFixed(1),
      heightPct: +(((maxSy - minSy) / window.innerHeight) * 100).toFixed(1),
    },
    cameraPosition: camera.position.toArray(),
    cameraFov: HERO_CAMERA.fov,
    partCount: group.children.length / 2,
  })

  return { boundingBox, inFrustum: frustum.intersectsBox(boundingBox) }
}

/** Checkpoint 4A — bright solid + wireframe geometry inspection */
export function PowerTransformerWireframe() {
  const groupRef = useRef<THREE.Group>(null)
  const { camera, size } = useThree()

  const partGeometries = useMemo(() => buildPartGeometries(buildPowerTransformerParts()), [])

  useEffect(() => {
    return () => {
      partGeometries.forEach(({ geometry }) => geometry.dispose())
    }
  }, [partGeometries])

  useEffect(() => {
    if (!groupRef.current) return
    logTransformerFrustumDebug(groupRef.current, camera)
  }, [camera, size.width, size.height])

  const { position, rotation, scale } = POWER_TRANSFORMER_STAGE4

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {partGeometries.map(({ geometry }, index) => (
        <group key={index}>
          <mesh geometry={geometry} renderOrder={1}>
            <meshBasicMaterial
              color={SOLID_COLOR}
              transparent={false}
              opacity={1}
              depthWrite
              depthTest
            />
          </mesh>
          <mesh geometry={geometry} renderOrder={2}>
            <meshBasicMaterial
              color={WIREFRAME_COLOR}
              wireframe
              transparent={false}
              opacity={1}
              depthWrite={false}
              depthTest
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
