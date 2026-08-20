import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

function box(w: number, h: number, d: number): THREE.BoxGeometry {
  return new THREE.BoxGeometry(w, h, d)
}

function cylinder(rTop: number, rBottom: number, h: number, segments = 16): THREE.CylinderGeometry {
  return new THREE.CylinderGeometry(rTop, rBottom, h, segments)
}

/** PLACEHOLDER geometries — replace with production GLB models via config */
export function createPlaceholderGeometry(type: string): THREE.BufferGeometry {
  switch (type) {
    case 'power-transformer': {
      const body = box(1.4, 1.2, 0.9)
      body.translate(0, 0, 0)
      const tank = box(1.6, 0.3, 1.0)
      tank.translate(0, 0.75, 0)
      const b1 = cylinder(0.08, 0.08, 0.5)
      b1.translate(-0.4, 1.1, 0)
      const b2 = cylinder(0.08, 0.08, 0.5)
      b2.translate(0.4, 1.1, 0)
      const b3 = cylinder(0.06, 0.06, 0.4)
      b3.translate(0, 1.05, 0.35)
      const radiator = box(0.15, 0.9, 0.6)
      radiator.translate(0.85, 0, 0)
      return mergeGeometries([body, tank, b1, b2, b3, radiator])!
    }
    case 'dry-type-transformer': {
      const core = box(1.0, 1.4, 0.7)
      const winding1 = box(0.15, 1.0, 0.5)
      winding1.translate(-0.25, 0, 0)
      const winding2 = box(0.15, 1.0, 0.5)
      winding2.translate(0.25, 0, 0)
      return mergeGeometries([core, winding1, winding2])!
    }
    case 'gis': {
      const main = cylinder(0.35, 0.35, 2.2, 12)
      main.rotateZ(Math.PI / 2)
      const end1 = cylinder(0.45, 0.35, 0.3, 12)
      end1.rotateZ(Math.PI / 2)
      end1.translate(-1.1, 0, 0)
      const end2 = cylinder(0.35, 0.45, 0.3, 12)
      end2.rotateZ(Math.PI / 2)
      end2.translate(1.1, 0, 0)
      const bushing = cylinder(0.1, 0.1, 0.35)
      bushing.translate(0, 0.5, 0)
      return mergeGeometries([main, end1, end2, bushing])!
    }
    case 'ais': {
      const frame = box(0.8, 2.0, 0.6)
      const ins1 = cylinder(0.12, 0.15, 0.6)
      ins1.translate(-0.25, 1.2, 0)
      const ins2 = cylinder(0.12, 0.15, 0.6)
      ins2.translate(0.25, 1.2, 0)
      const bus = box(0.6, 0.08, 0.08)
      bus.translate(0, 0.8, 0)
      return mergeGeometries([frame, ins1, ins2, bus])!
    }
    case 'circuit-breaker': {
      const column = cylinder(0.2, 0.2, 1.6)
      const tank = box(0.5, 0.4, 0.4)
      tank.translate(0, -0.7, 0)
      const contact = cylinder(0.08, 0.08, 0.3)
      contact.translate(0, 0.95, 0)
      const arc = box(0.12, 0.5, 0.12)
      arc.translate(0, 0.5, 0)
      return mergeGeometries([column, tank, contact, arc])!
    }
    case 'rotating-machine': {
      const body = cylinder(0.5, 0.5, 1.2)
      const endCap1 = cylinder(0.35, 0.5, 0.2)
      endCap1.translate(0, 0.7, 0)
      const endCap2 = cylinder(0.5, 0.35, 0.2)
      endCap2.translate(0, -0.7, 0)
      const shaft = cylinder(0.08, 0.08, 0.4)
      shaft.translate(0, -0.9, 0)
      const fin = box(0.05, 0.6, 0.3)
      fin.translate(0.55, 0, 0)
      return mergeGeometries([body, endCap1, endCap2, shaft, fin])!
    }
    case 'power-cables': {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.6, -0.3, 0),
        new THREE.Vector3(-0.2, 0.1, 0.1),
        new THREE.Vector3(0.3, 0.0, -0.1),
        new THREE.Vector3(0.7, -0.2, 0),
      ])
      const tube = new THREE.TubeGeometry(curve, 24, 0.08, 8, false)
      const termination = cylinder(0.15, 0.12, 0.35)
      termination.translate(0.75, -0.15, 0)
      const stress = cylinder(0.18, 0.15, 0.15)
      stress.translate(0.6, -0.05, 0)
      return mergeGeometries([tube, termination, stress])!
    }
    case 'shunt-reactor': {
      const core = cylinder(0.4, 0.4, 1.0)
      const coil1 = new THREE.TorusGeometry(0.45, 0.06, 8, 24)
      coil1.rotateX(Math.PI / 2)
      coil1.translate(0, 0.3, 0)
      const coil2 = new THREE.TorusGeometry(0.45, 0.06, 8, 24)
      coil2.rotateX(Math.PI / 2)
      coil2.translate(0, -0.3, 0)
      const base = box(0.7, 0.15, 0.7)
      base.translate(0, -0.55, 0)
      return mergeGeometries([core, coil1, coil2, base])!
    }
    case 'capacitor-bank': {
      const units: THREE.BufferGeometry[] = []
      for (let i = 0; i < 4; i++) {
        const unit = box(0.25, 0.8, 0.35)
        unit.translate(-0.45 + i * 0.3, 0, 0)
        units.push(unit)
      }
      const frame = box(1.3, 0.1, 0.5)
      frame.translate(0, -0.45, 0)
      const busbar = box(1.1, 0.06, 0.06)
      busbar.translate(0, 0.5, 0)
      return mergeGeometries([...units, frame, busbar])!
    }
    default:
      return box(1, 1, 1)
  }
}
