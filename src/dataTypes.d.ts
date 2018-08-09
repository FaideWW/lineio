/**
 * State import types
 */
export interface IUnitState {
  x: number;
  y: number;
  health: number;
  color: string;
}

export interface ITowerState {
  x: number;
  y: number;
  health: number;
}

export interface ILaneState {
  width: number;
  height: number;
  units: IUnitState[];
  towers: ITowerState[];
}

export interface IGameState {
  lanes: ILaneState[];
}

export type GameSettings = {
  canvasSelector?: string;
  timerSelector?: string;
  frametimeSelector?: string;
  framesPerSecond?: number;
  physicsUpdatesPerSecond?: number;
  logicUpdatesPerSecond?: number;
  tileSize?: number;
};

/**
 * Augment the window
 */

declare global {
  interface IGameWindow extends Window {
    startGame(): void;
    stopGame(): void;
  }
}
