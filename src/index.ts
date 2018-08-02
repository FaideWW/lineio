/**
 * Set up game state
 */
import testStateJson from '../data/testState.json';
import { GameData } from './dataTypes';
import { Game } from './Game';
import './style.css';

const game: Game = new Game('.canvas');

game.importState(<GameData> testStateJson);
