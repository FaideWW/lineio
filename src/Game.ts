/**
 * Game.ts
 *
 * Responsible for the game state and the core loop
 */
import { Canvas } from './Canvas.ts';

export class Game {
  private canvas: Canvas;
  private state: object;

  constructor(canvasSelector: string) {
    this.canvas = new Canvas(canvasSelector, 200, 600);
    this.initState();
  }

  private initState(): void {
    this.state = {
      enemies: Unit[],
      towers: Tower[]
    };
  }

}
