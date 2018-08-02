import { UnitData } from './dataTypes';
/**
 * Unit.ts
 *
 * Unit actor logic
 */

export class Unit {
  private x: number;
  private y: number;
  private health: number;

  public static FROM(data: UnitData): Unit {
    const u: Unit = new Unit();
    u.x = data.x;
    u.y = data.y;
    u.health = data.health;

    return u;
  }
}
