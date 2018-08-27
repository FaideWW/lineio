/**
 * Game.ts
 *
 */
import { Canvas } from './Canvas';
import {
  GameSettings,
  IGameState,
  IInputState,
  ILaneState
} from './dataTypes';
import { Lane } from './Lane';
import { InputUpdater } from './systems/InputUpdater';
import { LogicUpdater } from './systems/LogicUpdater';
import { PhysicsUpdater } from './systems/PhysicsUpdater';
import { Renderer } from './systems/Renderer';

const DEFAULT_SETTINGS: GameSettings = {
  canvasSelector: '.canvas',
  timerSelector: '.gameTimer',
  frametimeSelector: '.frameTimer',
  framesPerSecond: 60,
  physicsUpdatesPerSecond: 30,
  logicUpdatesPerSecond: 30,
  tileSize: 10
};

/**
 * class Game
 *
 * Responsible for the game state and the core loop
 */
export class Game implements IGameState {
  // Game State
  public lanes: Lane[];
  public input: IInputState;

  // DOM hooks and rendering settings
  private canvas: Canvas;
  private timerDiv: HTMLElement;
  private frametimeDiv: HTMLElement;

  // Systems
  private inputUpdater: InputUpdater;
  private logicUpdater: LogicUpdater;
  private physicsUpdater: PhysicsUpdater;
  private renderer: Renderer;

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
      logicUpdatesPerSecond,
      tileSize
    } = settings;

    this.canvas = new Canvas(canvasSelector, 200, 600);
    this.timerDiv = document.querySelector(timerSelector);
    this.frametimeDiv = document.querySelector(frametimeSelector);

    // Configure systems
    this.inputUpdater  = new InputUpdater();
    this.logicUpdater = new LogicUpdater();
    this.physicsUpdater = new PhysicsUpdater();
    this.renderer = new Renderer({ tileSize });

    this.minRenderTime = Math.ceil(1000 / framesPerSecond);
    this.minPhysicsTime = Math.ceil(1000 / physicsUpdatesPerSecond);
    this.minLogicTime = Math.ceil(1000 / logicUpdatesPerSecond);

    this.startTime = 0;
    this.lastTick = 0;
    this.running = false;

    this.animationFrameRequestId = 0;
  }

  public importState(state: IGameState): void {
    this.lanes = state.lanes.map((laneState: ILaneState) => Lane.FROM(laneState));
  }

  public exportState(): IGameState {
    // TODO: Implement caching here
    return {
      lanes: this.lanes,
      input: this.input
    };
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
    const delta: number = timestamp - this.lastTick;
    this.timerDiv.innerText = `${timestamp - this.startTime}`;
    this.frametimeDiv.innerText = `${delta}`;
    // Process user input
    this.inputUpdater.updateInput(this.exportState());
    // Do actor logic
    this.logicUpdater.updateLogic(this.exportState());
    // Update physics
    this.physicsUpdater.updatePhysics(this.exportState(), delta);
    // Rerender
    this.renderer.render(this.canvas, this.exportState());

    this.lastTick = timestamp;
    // Re-schedule update
    if (this.running) {
      this.animationFrameRequestId = window.requestAnimationFrame(this.update);
    }
  }

  private bindEventListeners() {
    const el = this.canvas.getEl();
  }
}
