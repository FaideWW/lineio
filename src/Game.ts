/**
 * Game.ts
 *
 */
import { Canvas } from './Canvas';
import { GameData, LaneData } from './dataTypes';
import { Lane } from './Lane';

/**
 * class Game
 *
 * Responsible for the game state and the core loop
 */
export class Game {
  private canvas: Canvas;
  private lanes: Lane[];

  private startTime: number;
  private lastTick: number;
  private running: boolean;

  constructor(canvasSelector: string) {
    this.canvas = new Canvas(canvasSelector, 200, 600);
    this.startTime = 0;
    this.lastTick = 0;
    this.running = false;
  }

  public importState(state: GameData): void {
    this.lanes = state.lanes.map((laneData: LaneData) => Lane.FROM(laneData));
  }

  public start(): void {
    this.startTime = Date.now();
    this.lastTick = this.startTime;
    this.running = true;
  }

  public update(): void {
    // Do actor logic
    // Update physics
    // Rerender
  }
}
