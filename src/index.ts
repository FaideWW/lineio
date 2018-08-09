/**
 * Set up game state
 */
import testStateJson from '../data/testState.json';
import { GameState } from './dataTypes';
import { Game } from './Game';
import './style.css';

const game: Game = new Game();

game.importState(<GameState> testStateJson);

(<IGameWindow> window).startGame = game.start;
(<IGameWindow> window).stopGame = game.stop;
