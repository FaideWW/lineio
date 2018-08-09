/**
 * Lane.ts
 *
 */
import { Canvas } from './Canvas';
import { LaneState, TowerState, UnitState } from './dataTypes';
import { Tower } from './Tower';
import { Unit } from './Unit';

/**
 * class Lane
 *
 * Holds data and logic for managing Lanes
 */
export class Lane {
  private width: number;
  private height: number;
  private units: Unit[];
  private towers: Tower[];

  public static FROM(state: LaneState): Lane {
    const l: Lane = new Lane();
    l.width = state.width;
    l.height = state.height;
    l.units = state.units.map((unitState: UnitState) => Unit.FROM(unitState));
    l.towers = state.towers.map((towerState: TowerState) => Tower.FROM(towerState));

    return l;
  }
}
