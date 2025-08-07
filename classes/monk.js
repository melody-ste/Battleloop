import Character from './character.js';

class Monk extends Character {
  constructor(name) {
    super(name, 8, 2, 200);
  }
  
  specialAttack() {
    if (this.mana >= 25) {
      console.log(`${this.name} utilise le pouvoir Heal`);
      this.hp += 8;
      this.mana -= 25;
    } else {
      console.log(`${this.name} n'a pas assez de mana`);
    }
  }
};

export default Monk;