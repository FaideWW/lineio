import { ITowerState, IVector } from './dataTypes';
import { Vector } from './Vector';
/**
 * Tower.ts
 *
 * Tower actor logic
 */

export class Tower implements ITowerState {
  public position: IVector;
  public health: number;
  public color: string;

  public static FROM(state: ITowerState): Tower {
    const t: Tower = new Tower();
    t.position = new Vector(state.position.x, state.position.y);
    t.health = state.health;
    t.color = state.color;

    return t;
  }
}
