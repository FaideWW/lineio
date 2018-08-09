/**
 * Game.ts
 *
 */
import { Canvas } from './Canvas';
import { GameSettings, GameState, LaneState } from './dataTypes';
import { Lane } from './Lane';

const DEFAULT_SETTINGS: GameSettings = {
  canvasSelector: '.canvas',
  timerSelector: '.gameTimer',
  frametimeSelector: '.frameTimer',
  framesPerSecond: 60,
  physicsUpdatesPerSecond: 30,
  logicUpdatesPerSecond: 30
};

/**
 * class Game
 *
 * Responsible for the game state and the core loop
 */
export class Game {
  // DOM hooks and data
  private canvas: Canvas;
  private timerDiv: HTMLElement;
  private frametimeDiv: HTMLElement;
  private lanes: Lane[];

  // Game Loop
  private animationFrameRequestId: number;
  private minRenderTime: number;
  private minPhysicsTime: number;
  private minLogicTime: number;

  private startTime: number;
  private lastTick: number;
  private running: boolean;

  constructor(settings: GameSettings = DEFAULT_SETTINGS) {
    const {
      canvasSelector,
      timerSelector,
      frametimeSelector,
      framesPerSecond,
      physicsUpdatesPerSecond,
      logicUpdatesPerSecond
    } = settings;

    this.canvas = new Canvas(canvasSelector, 200, 600);
    this.timerDiv = document.querySelector(timerSelector);
    this.frametimeDiv = document.querySelector(frametimeSelector);

    this.minRenderTime = Math.ceil(1000 / framesPerSecond);
    this.minPhysicsTime = Math.ceil(1000 / physicsUpdatesPerSecond);
    this.minLogicTime = Math.ceil(1000 / logicUpdatesPerSecond);

    this.startTime = 0;
    this.lastTick = 0;
    this.running = false;

    this.animationFrameRequestId = 0;
  }

  public importState(state: GameState): void {
    this.lanes = state.lanes.map((laneState: LaneState) => Lane.FROM(laneState));
  }

  public start = (): void => {
    if (this.running) {
      return;
    }

    this.startTime = performance.now();
    this.lastTick = this.startTime;
    this.running = true;

    this.animationFrameRequestId = window.requestAnimationFrame(this.update);
  }

  public stop = (): void => {
    if (!this.running) {
      return;
    }

    this.running = false;
    window.cancelAnimationFrame(this.animationFrameRequestId);
  }

  public update = (timestamp: number): void  => {
    this.timerDiv.innerText = `${timestamp - this.startTime}`;
    this.frametimeDiv.innerText = `${timestamp - this.lastTick}`;
    // Do actor logic
    // Update physics
    // Rerender

    this.lastTick = timestamp;
    // Re-schedule update
    if (this.running) {
      this.animationFrameRequestId = window.requestAnimationFrame(this.update);
    }
  }
}
