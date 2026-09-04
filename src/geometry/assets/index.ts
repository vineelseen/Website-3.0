import type { AssetId } from '../../types'
import type { GeometryPart } from '../geometryBuilder'
import { buildPowerTransformerParts, POWER_TRANSFORMER_HITBOX } from './powerTransformer'
import { buildDryTypeTransformerParts, DRY_TYPE_HITBOX } from './dryTypeTransformer'
import { buildGisParts, GIS_HITBOX } from './gis'
import { buildAisParts, AIS_HITBOX } from './ais'
import { buildCircuitBreakerParts, CIRCUIT_BREAKER_HITBOX } from './circuitBreaker'
import { buildRotatingMachineParts, ROTATING_MACHINE_HITBOX } from './rotatingMachine'
import { buildPowerCablesParts, POWER_CABLES_HITBOX } from './powerCables'
import { buildShuntReactorParts, SHUNT_REACTOR_HITBOX } from './shuntReactor'
import { buildCapacitorBankParts, CAPACITOR_BANK_HITBOX } from './capacitorBank'

export interface ProceduralAssetDefinition {
  buildParts: () => GeometryPart[]
  hitbox: [number, number, number]
}

export const PROCEDURAL_ASSETS: Record<AssetId, ProceduralAssetDefinition> = {
  'power-transformer': {
    buildParts: buildPowerTransformerParts,
    hitbox: POWER_TRANSFORMER_HITBOX,
  },
  'dry-type-transformer': {
    buildParts: buildDryTypeTransformerParts,
    hitbox: DRY_TYPE_HITBOX,
  },
  gis: {
    buildParts: buildGisParts,
    hitbox: GIS_HITBOX,
  },
  ais: {
    buildParts: buildAisParts,
    hitbox: AIS_HITBOX,
  },
  'circuit-breaker': {
    buildParts: buildCircuitBreakerParts,
    hitbox: CIRCUIT_BREAKER_HITBOX,
  },
  'rotating-machine': {
    buildParts: buildRotatingMachineParts,
    hitbox: ROTATING_MACHINE_HITBOX,
  },
  'power-cables': {
    buildParts: buildPowerCablesParts,
    hitbox: POWER_CABLES_HITBOX,
  },
  'shunt-reactor': {
    buildParts: buildShuntReactorParts,
    hitbox: SHUNT_REACTOR_HITBOX,
  },
  'capacitor-bank': {
    buildParts: buildCapacitorBankParts,
    hitbox: CAPACITOR_BANK_HITBOX,
  },
}
