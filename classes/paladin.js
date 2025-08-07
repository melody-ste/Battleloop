import Character from './character.js';

class Paladin extends Character {
  constructor(name="Ulder") {
    super(name, 16, 3, 160);
  }

  specialAttack(victim) {
    if (this.mana>=40) {
      console.log(`${this.name} utilise le pouvoir Healing Lighting sur ${victim.name}`);
      victim.takeDamage(4);
      this.mana-=40;
      if (victim.status === 'loser') this.mana += 20;
      } else {
      console.log(`${this.name} n'a pas assez de mana`);
    }
  }
};
export default Paladin;
