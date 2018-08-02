import './style.css';
/**
 * Set up game state
 */
function initGame(canvasEl : HTMLElement) : void {
  console.log('Initializing...');
  canvasEl.width = document.body.clientWidth;
  canvasEl.height = document.body.clientHeight;
  const canvasW : number = canvasEl.width;
  const canvash : number = canvasEl.height;
}

initGame(document.getElementById('game'));
