import Character from './character.js';

class Berzerker extends Character {
  constructor(name) {
    super(name, 8, 4, 0);
  }

  specialAttack() {
    console.log(`${this.name} utilise l'attaque Rage.`);
    this.dmg += 2;
    this.hp -= 1;
    if (this.hp <= 0) {
      this.hp = 0;
      this.status = 'loser';
      console.log(`${this.name} meurt de Rage.`);
    }
  }
};

export default Berzerker;