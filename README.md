# GAME RPG

A mini turn-based role-playing game (RPG) built in object-oriented JavaScript, playable in the browser console. Choose your hero, face off against randomized enemies, and try to survive until the last round!


## Project Structure

```
project-root/
├── index.html               # Form UI and game interaction
├── main.js                  # Game initialization + form logic
├── game/
│   ├── game.js              # Main Game class
│   └── random_players.js    # Function to generate AI players
├── classes/
│   ├── character.js         # Base Character class
│   ├── fighter.js
│   ├── paladin.js
│   ├── monk.js
│   ├── berzerker.js
│   ├── assassin.js
│   ├── wizard.js
│   └── druid.js
```

## How to Play

1. **Open `index.html` in a browser**
2. Fill in:
   - Your **player name**
   - Your **character class**
3. Submit to start the game.
4. In the attack form:
   - Choose **normal** or **special attack**
   - Choose your targeted

Game progress and stats will be printed in the **developer console**.


## Tech Used

- JavaScript ES6+
- HTML (basic forms)
- Console for game output


