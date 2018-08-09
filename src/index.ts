/**
 * Set up game state
 */
import testStateJson from '../data/testState.json';
import { IGameState } from './dataTypes';
import { Game } from './Game';
import './style.css';

const game: Game = new Game();

game.importState(<IGameState> testStateJson);

(<IGameWindow> window).startGame = game.start;
(<IGameWindow> window).stopGame = game.stop;
