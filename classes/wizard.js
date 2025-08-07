import Character from './character.js';

class Wizard extends Character {
  constructor(name) {
    super(name, 10, 2, 200);
  }

  specialAttack(victim) {
    if (this.mana >= 25) {
      console.log(`${this.name} utilise l'attaque Fireball sur ${victim.name}`);
      victim.takeDamage(7);
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