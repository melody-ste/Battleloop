import Character from './character.js';

const defaultValue = {hp:8, dmg:4, mana:0}

class Berzerker extends Character {
  
  constructor(name) {
    super({name,...defaultValue});
  }

  specialAttack() {
    console.log(`\n${this.name} utilise l'attaque Rage 💥`);
    this.dmg += 2;
    this.hp -= 1;
    if (this.hp <= 0) {
      this.hp = 0;
      this.status = 'loser';
      console.log(`${this.name} meurt de Rage.`);
    }
    if (victim && victim.status === "playing") {
      victim.takeDamage(this.dmg);
    }
  }

  getSpecialDamage() {
    return this.dmg + 2;
  }
};

export default Berzerker;