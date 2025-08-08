import Character from './character.js';

const defaultValue = {hp:10, dmg:2, mana:200}

class Wizard extends Character {
  
  constructor(name) {
    super({name,...defaultValue});
  }

  specialAttack(victim) {
    if (this.mana >= 25) {
      console.log(`\n${this.name} utilise l'attaque Fireball sur ${victim.name} 💥`);
      victim.takeDamage(6);
      this.mana -= 25;
    } else {
      console.log(`${this.name}n'a pas assez de mana`);
    }
  }

  getSpecialDamage() {
    return this.mana >= 25 ? 7 : 0;
  }
}

export default Wizard;