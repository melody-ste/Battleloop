import Game from './game/game.js';
import {generateRandomPlayers} from './game/random_players.js'

import Fighter from './classes/fighter.js';
import Paladin from './classes/paladin.js';
import Monk from './classes/monk.js';
import Berzerker from './classes/berzerker.js';
import Assassin from './classes/assassin.js';
import Wizard from './classes/wizard.js';
import Druid from '../classes/druid.js';

const players = generateRandomPlayers(5);

const game = new Game(players);
game.startGame();