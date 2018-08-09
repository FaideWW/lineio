import { UnitState } from './dataTypes';
/**
 * Unit.ts
 *
 * Unit actor logic
 */

export class Unit {
  private x: number;
  private y: number;
  private health: number;

  public static FROM(state: UnitState): Unit {
    const u: Unit = new Unit();
    u.x = state.x;
    u.y = state.y;
    u.health = state.health;

    return u;
  }
}
