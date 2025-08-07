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
  window.game = game;
  game.setHumanPlayer(name);
  updateTargetOptions();

  // Cache le formulaire de création et affiche celui des attaques
  e.target.style.display = 'none';
  document.getElementById('attackForm').style.display = 'block';

  console.log('Partie démarrée avec', players);
  console.log("🎮 Préparez-vous au combat !");
  
});


function updateTargetOptions() {
  const select = document.getElementById('targetSelect');
  select.innerHTML = '';

  const enemies = game.getAlivePlayers().filter(p => p !== game.humanPlayer);
  enemies.forEach(enemy => {
    const option = document.createElement('option');
    option.value = enemy.name;
    option.textContent = `${enemy.name}`;
    select.appendChild(option);
  });
}


// Formulaire pour choisir l'attaque 
document.getElementById('attackForm').addEventListener('submit', (e) => {
  e.preventDefault();

  if (!game) return alert('La partie n’a pas encore commencé');

  const attackType = e.target.attackType.value;

  const selectedName = e.target.targetSelect.value;
  const target = game.getAlivePlayers().find(p => p.name === selectedName);

  if (!target) {
    alert('Cible invalide ou plus en vie !');
    return;
  }

  if (attackType === 'special') {
    game.humanPlayer.specialAttack(target);
    if (game.humanPlayer instanceof Assassin) game.humanPlayer.endTurn(target);
  } else {
    game.humanPlayer.dealDamage(target);
  }

  if (game.checkWinner()) return;
  
  game.watchStats();
  game.playAITurn();
  
  updateTargetOptions();
});
