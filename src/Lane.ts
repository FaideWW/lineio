/**
 * Lane.ts
 *
 */
import { Canvas } from './Canvas';
import { LaneData, TowerData, UnitData } from './dataTypes';
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

  public static FROM(data: LaneData): Lane {
    const l: Lane = new Lane();
    l.width = data.width;
    l.height = data.height;
    l.units = data.units.map((unitData: UnitData) => Unit.FROM(unitData));
    l.towers = data.towers.map((towerData: TowerData) => Tower.FROM(towerData));

    return l;
  }
}
