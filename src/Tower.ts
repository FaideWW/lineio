import { TowerState } from './dataTypes';
/**
 * Tower.ts
 *
 * Tower actor logic
 */

export class Tower {
  private x: number;
  private y: number;
  private health: number;

  public static FROM(state: TowerState): Tower {
    const t: Tower = new Tower();
    t.x = state.x;
    t.y = state.y;
    t.health = state.health;

    return t;
  }
}
