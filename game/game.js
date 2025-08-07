class Game {
  constructor(players){
    this.players = players;
    this.turnLeft= 10;
    this.turnCount =1;
  }

  skipTurn() {
    this.turnLeft--;
    console.log(`Le tour est fini. Il reste ${this.turnLeft} tour(s)`);
  }

  watchStats(){
    console.log("Statistiques des joueurs :");
    this.players.forEach(p => {
      console.log(`| ${p.name} | HP: ${p.hp} | Mana: ${p.mana} | Status: ${p.status}|`);
    });
  }

  getAlivePlayers() {
    return this.players.filter(p => p.status === "playing");
  }

  checkWinner() {
    const alive = this.getAlivePlayers();
    if (alive.length === 1) {
      const winner = alive[0];
      winner.status = "winner";
      console.log(`${winner.name} est le dernier survivant ! Il gagne la partie.`);
      return true;
    }
    return false;
  }

  startTurn() {
    console.log(`Tour n°${this.turnCount}`);
    const alivePlayers = this.getAlivePlayers();

    // Mélange les joueurs 
    const shuffled = [...alivePlayers].sort(() => Math.random() - 0.5);

    shuffled.forEach(player => {
      if (player.status !== "playing") return;

      const enemies = this.getAlivePlayers().filter(p => p !== player);
      if (enemies.length === 0) return;

      const target = enemies[Math.floor(Math.random() * enemies.length)]; //Math.floor pour arrondir le random

      console.log(`c'est au tour de ${player.name}`);

      // random pour test
      const action = Math.random() < 0.5 ? 'normal' : 'special';

      if (action === 'special') {
        player.specialAttack(target);
        if (player instanceof Assassin) {
          player.endTurn(target);
        }
      } else {
        console.log(`${player.name} attaque ${target.name}`);
        player.dealDamage(target);
      }

      console.log(`${target.name} a ${target.hp} points de vie restants`);
    });

    
    console.log("Joueurs encore en vie :");
    this.getAlivePlayers().forEach(p => {
      console.log(`- ${p.name} (${p.hp} HP)`);
    });

    this.skipTurn();
    this.turnCount++;
  }


  startGame() {
    console.log("Début de la partie");

    while (this.turnLeft > 0 && this.getAlivePlayers().length > 1) {
      this.startTurn();

      if (this.checkWinner()) break;
    }

    if (this.turnLeft === 0) {
      console.log("Fin des tours !");
      const survivors = this.getAlivePlayers();
      if (survivors.length > 0) {
        console.log("Gagnants :");
        survivors.forEach(p => {
          p.status = "winner";
          console.log(`- ${p.name}`);
        });
      } else {
        console.log("Personne n'a survécu...");
      }
    }

    this.watchStats();
  }

}