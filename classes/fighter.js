import Character from './character.js';

const defaultValue = {hp:12, dmg:4, mana:80}

class Fighter extends Character {
  
  constructor(name) {
    super({name,...defaultValue});
    this.reducedDamage = false;
  }

  specialAttack(victim){

    if (this.mana>= 20) {
      console.log(`\n${this.name} utilise l'attaque Dark Vision 💥`);
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

  getSpecialDamage() {
    return this.mana >= 20 ? 5 : 0;
  }

};

export default Fighter;