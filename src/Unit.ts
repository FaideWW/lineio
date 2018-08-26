import { IUnitState, IVector } from './dataTypes';
import { Vector } from './Vector';
/**
 * Unit.ts
 *
 * Unit actor logic
 */

export class Unit implements IUnitState {
  public position: IVector;
  public health: number;
  public speed: number;
  public heading: IVector;
  public color: string;

  public static FROM(state: IUnitState): Unit {
    const u: Unit = new Unit();
    u.position = new Vector(state.position.x, state.position.y);
    u.health = state.health;
    u.speed = state.speed;
    u.heading = state.heading;
    u.color = state.color;

    return u;
  }

  public getTilePosition(): IVector {
    return new Vector(Math.round(this.position.x), Math.round(this.position.y));
  }
}
