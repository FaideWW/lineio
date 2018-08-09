/**
 * systems/Renderer.ts
 *
 * handles taking a game state and rendering it to a canvas context
 */
import { Canvas } from '../Canvas';
import { Lane } from '../Lane';
import { GameState } from '../dataTypes';

export function renderer(canvas: Canvas, gameState: GameState): void {
  canvas.clearCanvas();
  const ctx: CanvasRenderingContext2D = canvas.getCtx();

  gameState.lanes.forEach((lane: Lane): void => {

  });
}
