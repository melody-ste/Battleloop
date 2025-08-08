import Character from './character.js';

const defaultValue = {hp:8, dmg:3, mana:200}

class Monk extends Character {
  
  constructor(name) {
    super({name,...defaultValue});
  }
  
  specialAttack() {
    if (this.mana >= 25) {
      console.log(`\n${this.name} utilise le pouvoir Heal 💊`);
      this.hp += 8;
      this.mana -= 25;
    } else {
      console.log(`${this.name} n'a pas assez de mana`);
    }
  }

  getSpecialDamage() {
    return 0; // Pas une attaque offensive
  }
};

export default Monk;