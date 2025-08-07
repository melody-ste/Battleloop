class Character {

  constructor(name, hp, dmg, mana) {
    this.name = name;
    this.hp = hp;
    this.dmg = dmg;
    this.mana = mana;
    this.status = "playing";
  }

  takeDamage(damage){

    this.hp -= damage;

    if (this.hp <= 0) {
      this.hp = 0;
      this.status = 'loser';
      console.log(`\n${this.name} a perdu 💀`);
    } else {
      console.log(`\n${this.name} prends ${damage} point de dégât, il lui reste HP: ${this.hp}`);
    }
  }

  dealDamage(victim) {

    if (victim.status !== 'playing') {
      console.log(`${victim.name} a déjà perdu`);
      return;
    }

    victim.takeDamage(this.dmg);

    if (victim.status === 'loser') {
      this.mana += 20;
      console.log(`${this.name} a éliminé ${victim.name} et gagne 20 mana !`);
    }
  }

  specialAttack(victim) {
    console.log(`${this.name} n'a pas d'attauqe spécial`);
  }

  isAlive() {
    return this.status === "playing";
  }

};

export default Character;