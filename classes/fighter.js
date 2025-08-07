import Character from './character.js';

class Fighter extends Character {

  constructor(name) {
    super(name, 12, 4, 40);
    this.reducedDamage = false;
  }

  specialAttack(victim){

    if (this.mana>= 20) {
      console.log(`${this.name} utilise l'attaque Dark Vision`);
      victim.takeDamage(5);
      this.reducedDamage = true;
      this.mana-=20;
      if (victim.status === 'loser') this.mana += 20;

    }else{
      console.log(`${this.name} n'a pas assez de mana pour utiliser l'attaque Dark Vision`);
    }
  }

  takeDamage(damage){
    if(this.reducedDamage){
      damage= Math.max(damage-2,0);
      this.reducedDamage = false
    }
    super.takeDamage(damage);
  }
};

export default Fighter;