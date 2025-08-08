import Character from './character.js';

const defaultValue = {hp:10, dmg:6, mana:20}

class Assassin extends Character {
  
  constructor(name) {
    super({name,...defaultValue});
    this.isUntouchable = false;
  }

  specialAttack(victim) {
    if (this.mana >= 20) {
      console.log(`\n${this.name} utilise l'attaque Shadow Hit sur ${victim.name} 💥`);
      this.isUntouchable = true;
      victim.takeDamage(7);
      this.mana -= 20;

      if (victim.status === 'loser') this.mana += 20;
    } else {
      console.log(`${this.name} n'a pas assez de mana`);
    }
  }

  takeDamage(damage) {
    if (this.isUntouchable) {
      console.log(`${this.name} ne perd pas de points`);
      this.isUntouchable = false;
    } else {
      super.takeDamage(damage);
    }
  }

  endTurn(victim) {
    if (this.isUntouchable && victim.isAlive()) {
      console.log(`${this.name} n'a pas tuer son adversaire, il prend 7 points de dégats.`);
      this.takeDamage(7);
      this.isUntouchable = false;
    }
  }

  getSpecialDamage() {
    return this.mana >= 20 ? 7 : 0;
  }

};

export default Assassin;