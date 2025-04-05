// scripts/Animal.js
import { imageMap, nameSuggestions } from "./constants.js";
import { logActivity, getElapsedTime } from "./utils.js";
import { Game } from "./game.js"; // Game.removePet()을 호출할 때 필요

export class Animal {
  constructor(name, animalType) {
    this.name = name || Animal.generateName();
    this.animalType = animalType;
    this.energy = 50;
    this.fullness = 50;
    this.happiness = 50;
    this.alive = true;
    this.startTime = Date.now();
    this.activities = [];
    this.trophyShown = false;
    this.createPetElement();
    this.startDecay();
  }

  static generateName() {
    const availableNames = nameSuggestions.filter(name => !Game.pets[name]);
    if (availableNames.length === 0) {
      alert("All names are taken!");
      return "Unnamed";
    }
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    return availableNames[randomIndex];
  }

  createPetElement() {
    const petList = document.getElementById("pet-list");
    const imageFile = imageMap[this.animalType] || "default.png";

    this.petElement = document.createElement("li");
    this.petElement.classList.add("pet-card", `${this.animalType}-bg`);
    this.petElement.innerHTML = `
      <img src="images/${imageFile}" alt="${this.animalType}" class="pet-image" />
      <h3>${this.name} (${this.animalType})</h3>
      <progress class="energy-bar" max="100" value="${this.energy}"></progress>
      <p>Energy: <span class="energy">${this.energy}</span></p>
      <progress class="fullness-bar" max="100" value="${this.fullness}"></progress>
      <p>Fullness: <span class="fullness">${this.fullness}</span></p>
      <progress class="happiness-bar" max="100" value="${this.happiness}"></progress>
      <p>Happiness: <span class="happiness">${this.happiness}</span></p>
      <button class="nap-btn">Nap</button>
      <button class="play-btn">Play</button>
      <button class="eat-btn">Eat</button>
    `;
    petList.appendChild(this.petElement);

    this.petElement.querySelector(".nap-btn").addEventListener("click", () => this.nap());
    this.petElement.querySelector(".play-btn").addEventListener("click", () => this.play());
    this.petElement.querySelector(".eat-btn").addEventListener("click", () => this.eat());
  }

  updateUI() {
    this.petElement.querySelector(".energy").textContent = this.energy;
    this.petElement.querySelector(".fullness").textContent = this.fullness;
    this.petElement.querySelector(".happiness").textContent = this.happiness;
    this.petElement.querySelector(".energy-bar").value = this.energy;
    this.petElement.querySelector(".fullness-bar").value = this.fullness;
    this.petElement.querySelector(".happiness-bar").value = this.happiness;
  }

  startDecay() {
    this.decayInterval = setInterval(() => {
      if (!this.alive) return;

      this.energy = Math.max(this.energy - 5, 0);
      this.fullness = Math.max(this.fullness - 5, 0);
      this.happiness = Math.max(this.happiness - 5, 0);
      this.updateUI();

      if (this.energy === 0 || this.fullness === 0 || this.happiness === 0) {
        this.runAway();
      }
    }, 10000);
  }

  runAway() {
    clearInterval(this.decayInterval);
    this.alive = false;
    this.petElement.remove();

    const timestamp = new Date().toLocaleString();
    const timeElapsed = getElapsedTime(this.startTime);
    const history = this.activities.map(item => `• ${item}`).join("<br>");
    const message = `${this.name} ran away at ${timestamp}!<br>History:<br>${history}<br>• Ran away (${timeElapsed})`;

    const colorClass = `log-${this.animalType}`;
    logActivity(message, colorClass);

    Game.removePet(this.name);
  }

  nap() {
    if (!this.alive) return;
    this.energy = Math.min(this.energy + 40, 100);
    this.happiness = Math.max(this.happiness - 10, 0);
    this.fullness = Math.max(this.fullness - 10, 0);
    this.performActivity("Took a nap", "info");
  }

  play() {
    if (!this.alive) return;
    this.happiness = Math.min(this.happiness + 30, 100);
    this.fullness = Math.max(this.fullness - 10, 0);
    this.energy = Math.max(this.energy - 10, 0);
    this.performActivity("Played happily", "success");
  }

  eat() {
    if (!this.alive) return;
    this.fullness = Math.min(this.fullness + 30, 100);
    this.happiness = Math.min(this.happiness + 5, 100);
    this.energy = Math.max(this.energy - 15, 0);
    this.performActivity("Ate food", "success");
  }

  performActivity(actionText, logType) {
    this.animateBounce();
    this.updateUI();
    const elapsed = getElapsedTime(this.startTime);
    this.activities.push(`${actionText} (${elapsed})`);
    logActivity(`${this.name} ${actionText.toLowerCase()}`, logType);
  }

  animateBounce() {
    const image = this.petElement.querySelector(".pet-image");
    image.classList.add("animate-bounce");
    setTimeout(() => image.classList.remove("animate-bounce"), 1000);
  }
}
