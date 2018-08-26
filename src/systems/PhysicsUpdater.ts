/**
 * systems/PhysicsUpdater.ts
 *
 * Responsible for updating positions of units and projectiles
 */

import {
  IGameState,
  ILaneState,
  IUnitState,
  IVector
} from '../dataTypes';
import {
  vectorAdd,
  vectorMultiply,
  vectorNormalize
} from '../Vector';

type PhysicsSettings = {};

const DEFAULT_SETTINGS: PhysicsSettings = {};

/**
 * PhysicsUpdater
 */
export class PhysicsUpdater {
  public updatePhysics = (gameState: IGameState, deltaMS: number): void => {
    gameState.lanes.forEach((lane: ILaneState) => {
      lane.units.forEach((unit: IUnitState) => {
        const distance: number = unit.speed * (deltaMS / 1000);
        const displacement: IVector = vectorMultiply(unit.heading, distance);
        unit.position = vectorAdd(unit.position, displacement);
      });
    });
  }
}
