/**
 * State import types
 */
export type UnitState = {
  x: number;
  y: number;
  health: number;
};

export type TowerState = {
  x: number;
  y: number;
  health: number;
};

export type LaneState = {
  width: number;
  height: number;
  units: UnitState[];
  towers: TowerState[];
};

export type GameState = {
  lanes: LaneState[];
};

export type GameSettings = {
  canvasSelector?: string;
  timerSelector?: string;
  frametimeSelector?: string;
  framesPerSecond?: number;
  physicsUpdatesPerSecond?: number;
  logicUpdatesPerSecond?: number;
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
