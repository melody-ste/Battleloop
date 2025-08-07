import Character from './character.js';

class Druid extends Character {
  constructor(name) {
    super(name, 14, 3, 140);
  }

  specialAttack(victim) {
    if (this.mana >= 20) {
      console.log(`${this.name} utilise l'attaque Summon Beast sur ${victim.name}`);
      victim.takeDamage(5);
      this.mana -= 20;
    } else {
      console.log(`${this.name}n'a pas assez de mana`);
    }
  }
}

export default Druid;