import Character from './character.js';

const defaultValue = {hp:14, dmg:3, mana:140}

class Druid extends Character {
  
  constructor(name) {
    super({name,...defaultValue});
  }

  specialAttack(victim) {
    if (this.mana >= 20) {
      console.log(`\n${this.name} utilise l'attaque Summon Beast sur ${victim.name} 💥`);
      victim.takeDamage(5);
      this.mana -= 20;
    } else {
      console.log(`${this.name} n'a pas assez de mana`);
    }
  }

  getSpecialDamage() {
    return this.mana >= 20 ? 5 : 0;
  }
}

export default Druid;