// scripts/game.js
import { logActivity } from "./utils.js";
import { showTrophyCelebration } from "./celebration.js";
import { Animal } from "./Animal.js";

// Manage pets and core game logic
export class Game {
  static pets = {};

  static addPet(name, animalType) {
    if (Object.keys(Game.pets).length >= 4) {
      alert("You can only have up to 4 pets!");
      return;
    }
    if (!name.trim() || Game.pets[name]) name = Animal.generateName();
    Game.pets[name] = new Animal(name, animalType);
  }

  static removePet(name) {
    delete Game.pets[name];
    const remainingPets = Object.keys(Game.pets);
    if (remainingPets.length === 1) {
      const winner = remainingPets[0];
      setTimeout(() => showTrophyCelebration(winner), 1000);
    }
  }

  static resetGame() {
    Object.values(Game.pets).forEach(pet => clearInterval(pet.decayInterval));
    document.getElementById("pet-list").innerHTML = "";
    document.getElementById("log-list").innerHTML = "";
    Game.pets = {};
    logActivity("Game has been reset!", "warning");
  }
}
