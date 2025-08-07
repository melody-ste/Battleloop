import Game from './game/game.js';
import {generateRandomPlayers} from './game/random_players.js'

import Fighter from './classes/fighter.js';
import Paladin from './classes/paladin.js';
import Monk from './classes/monk.js';
import Berzerker from './classes/berzerker.js';
import Assassin from './classes/assassin.js';
import Wizard from './classes/wizard.js';
import Druid from '../classes/druid.js';

const classMap = { Fighter, Paladin, Monk, Berzerker, Assassin, Wizard, Druid };

let game;

// Récupère les infos du formulaire
document.getElementById('playerForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = e.target.playerName.value.trim();
  const className = e.target.playerClass.value;

  if (!name || !className) {
    alert('Merci de remplir le nom et la classe');
    return;
  }

  const PlayerClass = classMap[className];
  const player = new PlayerClass(name);

  const RandomPlayers = generateRandomPlayers(4);
  const players = [player, ...RandomPlayers];

  game = new Game(players);
  game.setHumanPlayer(name);

  // Cache le formulaire de création et affiche celui des attaques
  e.target.style.display = 'none';
  document.getElementById('attackForm').style.display = 'block';

  console.log('Partie démarrée avec', players);
  game.watchStats();
});

// Formulaire pour choisir l'attaque 
document.getElementById('attackForm').addEventListener('submit', (e) => {
  e.preventDefault();

  if (!game) return alert('La partie n’a pas encore commencé');

  const attackType = e.target.attackType.value;

  // cible au hasard (tu peux aussi faire formulaire cible)
  const enemies = game.getAlivePlayers().filter(p => p !== game.humanPlayer);
  if (enemies.length === 0) return alert('Plus d\'ennemis en vie !');

  const target = enemies[Math.floor(Math.random() * enemies.length)];

  if (attackType === 'special') {
    game.humanPlayer.specialAttack(target);
    if (game.humanPlayer instanceof Assassin) game.humanPlayer.endTurn(target);
  } else {
    game.humanPlayer.dealDamage(target);
  }

  game.playAITurn();
  game.watchStats();
});
