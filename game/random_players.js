import Fighter from '../classes/fighter.js';
import Paladin from '../classes/paladin.js';
import Monk from '../classes/monk.js';
import Berzerker from '../classes/berzerker.js';
import Assassin from '../classes/assassin.js';
import Wizard from '../classes/wizard.js';
import Druid from '../classes/druid.js';

const randomName = [
  "Grace", "Ulder", "Moana", "Draven", "Carl", "Olga", "Abel", "Yevelda", "Hugues", "Prosperine", "Jon", "Orianna", "Hagren", "Sirail", "Gontran","Dambert","Gysla", "Kali", "Mélissande", "Sam", "Kael"
];

const classMap = {
  Fighter,
  Paladin,
  Monk,
  Berzerker,
  Assassin,
  Wizard,
  Druid
};

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}


export function generateRandomPlayers(count = 5) {
  const players = [];
  const availableNames = [...randomName];

  while (players.length < count) {
    const ClassName = getRandomElement(Object.keys(classMap));
    const ClassConstructor = classMap[ClassName];

    const nameIndex = Math.floor(Math.random()*availableNames.length)
    const name = availableNames.splice(nameIndex, 1)[0]; // retire un nom unique

    const player = new ClassConstructor(name);
    players.push(player);
  }

  return players;
}