import { ITowerState } from './dataTypes';
/**
 * Tower.ts
 *
 * Tower actor logic
 */

export class Tower implements ITowerState {
  public x: number;
  public y: number;
  public health: number;

  public static FROM(state: ITowerState): Tower {
    const t: Tower = new Tower();
    t.x = state.x;
    t.y = state.y;
    t.health = state.health;

    return t;
  }
}
