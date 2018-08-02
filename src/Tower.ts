import { TowerData } from './dataTypes';
/**
 * Tower.ts
 *
 * Tower actor logic
 */

export class Tower {
  private x: number;
  private y: number;
  private health: number;

  public static FROM(data: TowerData): Tower {
    const t: Tower = new Tower();
    t.x = data.x;
    t.y = data.y;
    t.health = data.health;

    return t;
  }
}
