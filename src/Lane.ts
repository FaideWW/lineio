/**
 * Lane.ts
 *
 */
import { Canvas } from './Canvas';
import { ILaneState, ITowerState, IUnitState } from './dataTypes';
import { Tower } from './Tower';
import { Unit } from './Unit';

/**
 * class Lane
 *
 * Holds data and logic for managing Lanes
 */
export class Lane implements ILaneState {
  public width: number;
  public height: number;
  public units: Unit[];
  public towers: Tower[];

  public static FROM(state: ILaneState): Lane {
    const l: Lane = new Lane();
    l.width = state.width;
    l.height = state.height;
    l.units = state.units.map((unitState: IUnitState) => Unit.FROM(unitState));
    l.towers = state.towers.map((towerState: ITowerState) => Tower.FROM(towerState));

    return l;
  }
}
