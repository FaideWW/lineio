/**
 * State import types
 */
export interface IVector {
  x: number;
  y: number;
}

export interface IUnitState {
  position: IVector;
  health: number;
  speed: number;
  heading: IVector;
  color: string;
}

export interface ITowerState {
  position: IVector;
  health: number;
  color: string;
}

export interface ILaneState {
  width: number;
  height: number;
  origin: IVector;
  destination: IVector;
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
