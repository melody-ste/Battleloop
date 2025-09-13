import Assassin from '../classes/assassin.js';

class Game {
  constructor(players){
    this.players = players;
    this.turnLeft= 10;
    this.turnCount =1;
    this.humanPlayer = null;
  }

  setHumanPlayer(name) {
    this.humanPlayer = this.players.find(h => h.name === name);
    if (!this.humanPlayer) {
      console.warn(`Aucun joueur trouvé avec le nom ${name}`);
    }
  }

  skipTurn() {
    this.turnLeft--;
    console.log(`\nLe tour est fini. Il reste ${this.turnLeft} tour(s)`);
  }

  watchStats() {
    console.log("\n📊 Statistiques des joueurs :");

    // tableau
    const stats = {};
    this.players.forEach(p => {
      stats[p.name] = {
        Class: p.constructor.name,
        HP: p.hp,
        Mana: p.mana,
        Status: p.status
      };
    });

    console.table(stats);
  }


  updateStatsUI() {
    const statsArea = document.getElementById('statsArea');
    statsArea.innerHTML = ''; // reset avant de recréer

    this.players.forEach(p => {
      const card = document.createElement('div');
      card.className = 'player-card';

      card.innerHTML = `
        <h3>${p.name}</h3>
        <div class="class">${p.constructor.name}</div>
        <div class="stat">❤️ HP : ${p.hp}</div>
        <div class="stat">🔮 Mana : ${p.mana}</div>
        <div class="stat">📌 Status : ${p.status}</div>
      `;

      statsArea.appendChild(card);
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
      console.log(`\n🎉 ${winner.name} est le dernier survivant ! Il gagne la partie 👑`);
      return true;
    }
    return false;
  }
  
  async finishGame() {
    const isHumanPlayerDead = this.humanPlayer.status === "loser";
    if(isHumanPlayerDead && this.getAlivePlayers().length>1){
      console.log(`Tu as perdu`);
      await this.playAITurn(); 
      this.finishGame();
      return true;
    }
    this.playAITurn() 
  }

  async playAITurn() {
    const alivePlayers = this.getAlivePlayers();
    const shuffled = [...alivePlayers].sort(() => Math.random() - 0.5);

    for (const player of shuffled) {
      if (player === this.humanPlayer || player.status !== "playing") continue;

      const enemies = this.getAlivePlayers().filter(p => p !== player);
      if (enemies.length === 0) return;

      const target = enemies[Math.floor(Math.random() * enemies.length)];
      
      console.log(`\n🔸 c'est au tour de ${player.name} 🔸`);
      await this.delay(2000);

      // recherche coup fatal
      let fatalTarget = enemies.find(enemy => enemy.hp <= player.dmg);

      if (fatalTarget) {
        console.log(`\n${player.name} choisit de tuer ${fatalTarget.name} avec une attaque normale !`);
        await this.delay(2000);
        player.dealDamage(fatalTarget);
        this.updateStatsUI();

      } else {

        if (typeof player.getSpecialDamage === 'function') {
          const potentialSpecialDamage = player.getSpecialDamage();
          fatalTarget = enemies.find(enemy => enemy.hp <= potentialSpecialDamage);
        }

        if (fatalTarget && player.mana >= player.specialCost) {
          console.log(`\n${player.name} choisit de tuer ${fatalTarget.name} avec une attaque spéciale !`);
          await this.delay(2000);
          player.specialAttack(fatalTarget);
          if (player instanceof Assassin) player.endTurn(fatalTarget);
          this.updateStatsUI();

        } else {
          const target = enemies[Math.floor(Math.random() * enemies.length)];
          const action = Math.random() < 0.5 ? 'normal' : 'special';

          if (action === 'special' && player.mana >= player.specialCost) {
            console.log(`${player.name} tente une attaque spéciale sur ${target.name}`);
            await this.delay(2000);
            player.specialAttack(target);
            if (player instanceof Assassin) player.endTurn(target);
            this.updateStatsUI();

          } else {
            console.log(`\n🗡️ ${player.name} attaque ${target.name}`);
            await this.delay(2000);
            player.dealDamage(target);
            this.updateStatsUI();
          }
        }
      }
      await this.delay(2000);
    }
    this.skipTurn();
    this.turnCount++;
    if (game.checkWinner()) return;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // function playTurns() {
    
  // }

  // startGame() {
  //   console.log("Début de la partie");

  //   while (this.turnLeft > 0 && this.getAlivePlayers().length > 1) {
  //     this.startTurn();

  //     if (this.checkWinner()) break;
  //   }

  //   if (this.turnLeft === 0) {
  //     console.log("\nFin des tours !");
  //     const survivors = this.getAlivePlayers();
  //     if (survivors.length > 0) {
  //       console.log("\nGagnants :");
  //       survivors.forEach(p => {
  //         p.status = "winner";
  //         console.log(`- ${p.name}`);
  //       });
  //     } else {
  //       console.log("\nPersonne n'a survécu...");
  //     }
  //   }

  //   this.watchStats();
  // }

}

export default Game;