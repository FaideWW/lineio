/**
 * systems/InputUpdater
 *
 * handles processing user input
 */

import {
  IGameState,
  IInputState,
  ILaneState,
  IVector
} from '../dataTypes';

type InputSettings = {};
const DEFAULT_SETTINGS: InputSettings = {};

/**
 * InputUpdater
 */
export class InputUpdater {
  private lastState: IInputState;
  constructor(settings: InputSettings = DEFAULT_SETTINGS) {
    this.lastState = null;
  }

  public updateInput = (gameState: IGameState): void => {
    if (!this.hasStateChanged(this.lastState, gameState.input)) {
      return;
    }

    console.log(gameState.input);
  }

  // TODO: this should have native data structure support like immutable-js
  private hasStateChanged(inputState: IInputState, newInputState: IInputState): boolean {
    return (
      inputState.mouse.x !== newInputState.mouse.x ||
      inputState.mouse.y !== newInputState.mouse.y ||
      inputState.mouseLeft !== newInputState.mouseLeft ||
      inputState.mouseRight !== newInputState.mouseRight ||
      Object.keys(inputState.keys).every(
        (keyId: string): boolean => (newInputState.keys[keyId] === inputState.keys[keyId])
      )
    );
  }
}
