import { populateNameOptions } from "./utils.js";
import { Game } from "./game.js";

populateNameOptions();

document.getElementById("add-pet").addEventListener("click", () => {
  const name = document.getElementById("pet-name").value;
  const animalType = document.getElementById("pet-type").value;
  Game.addPet(name, animalType);
});

document.getElementById("reset-game").addEventListener("click", () => {
  Game.resetGame();
});

window.addEventListener("load", () => {
  setTimeout(() => {
    const topLayer = document.querySelector(".topLayer");
    if (topLayer) {
      topLayer.style.animationPlayState = "paused";
      topLayer.style.opacity = "0";
    }
  }, 30000);
});