import { IUnitState } from './dataTypes';
/**
 * Unit.ts
 *
 * Unit actor logic
 */

export class Unit implements IUnitState {
  public x: number;
  public y: number;
  public health: number;
  public color: string;

  public static FROM(state: IUnitState): Unit {
    const u: Unit = new Unit();
    u.x = state.x;
    u.y = state.y;
    u.health = state.health;
    u.color = state.color;

    return u;
  }
}
