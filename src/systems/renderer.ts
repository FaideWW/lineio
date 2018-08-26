/**
 * systems/renderer.ts
 *
 * handles taking a game state and rendering it to a canvas context
 */
import { Canvas } from '../Canvas';
import { IGameState, ILaneState, ITowerState, IUnitState } from '../dataTypes';
import { Lane } from '../Lane';

type RendererSettings = {
  tileSize?: number;
};

const DEFAULT_SETTINGS: RendererSettings = {
  tileSize: 10
};

export class Renderer {
  private tileSize: number;

  constructor(settings: RendererSettings = DEFAULT_SETTINGS) {
    this.tileSize = settings.tileSize;
  }

  public render = (canvas: Canvas, gameState: IGameState): void => {
    canvas.clearCanvas();
    const ctx: CanvasRenderingContext2D = canvas.getCtx();
    gameState.lanes.forEach((lane: ILaneState): void => this.renderLane(ctx, lane));
  }

  private renderLane(ctx: CanvasRenderingContext2D, lane: ILaneState): void {
    // Draw Units
    lane.units.forEach((unit: IUnitState) => {
      ctx.fillStyle = unit.color;
      ctx.fillRect(unit.position.x * this.tileSize, unit.position.y * this.tileSize, this.tileSize, this.tileSize);
    });

    // Draw Towers
    lane.towers.forEach((tower: ITowerState) => {
      ctx.fillStyle = tower.color;
      ctx.fillRect(tower.position.x * this.tileSize, tower.position.y * this.tileSize, this.tileSize, this.tileSize);
    });
  }
}
