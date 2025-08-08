import Character from './character.js';

const defaultValue = {hp:12, dmg:3, mana:160}

class Paladin extends Character {
  
  constructor(name) {
    super({name,...defaultValue});
  }

  specialAttack(victim) {
    if (this.mana>=40) {
      console.log(`\n${this.name} utilise le pouvoir Healing Lighting sur ${victim.name}💥💊`);
      victim.takeDamage(4);
      this.hp += 5;
      this.mana-=40;
      if (victim.status === 'loser') this.mana += 20;
      } else {
      console.log(`${this.name} n'a pas assez de mana`);
    }
  }

  getSpecialDamage() {
    return this.mana >= 40 ? 4 : 0;
  }
};
export default Paladin;
