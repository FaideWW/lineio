/**
 * Canvas.ts
 *
 * Handles the reference to the canvas and rendering
 */
export class Canvas {
  private canvasEl: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(canvasSelector: string, width: number, height: number) {
    this.canvasEl = document.querySelector(canvasSelector);
    if (this.canvasEl === null) {
      throw new Error('No canvas element found');
    }
    this.ctx = this.canvasEl.getContext('2d');
    this.resizeCanvas(width, height);
    this.clearCanvas();
  }

  public getCtx(): CanvasRenderingContext2D {
    return this.ctx;
  }

  public clearCanvas() : void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  private resizeCanvas(width: number, height: number) : void {
    this.canvasEl.width = this.width = width;
    this.canvasEl.height = this.height = height;
  }
}
