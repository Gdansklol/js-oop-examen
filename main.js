const imageMap = {
    cat: "tamagochi-1.png",
    dog: "tamagochi-2.png",
    rabbit: "tamagochi-3.png",
    parrot: "tamagochi-4.png",
  };
  
  const nameSuggestions = ["Mochi", "Luna", "Emochi", "Bella", "Coco", "Neko", "Chirpy"];
  
  class Animal {
    constructor(name, animalType) {
      this.name = name || Animal.generateName();
      this.animalType = animalType;
      this.energy = 50;
      this.fullness = 50;
      this.happiness = 50;
      this.alive = true;
      this.startTime = Date.now();
      this.activities = [];
      this.createPetElement();
      this.startDecay();
    }
  
    static generateName() {
      return nameSuggestions[Math.floor(Math.random() * nameSuggestions.length)];
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
      const timeElapsed = getElapsedTime(this.startTime);
      this.activities.push(`Ran away (${timeElapsed})`);
      logActivity(`${this.name} ran away! | History: ${this.activities.join(", ")}`, "danger");
    }
  
    nap() {
      if (!this.alive) return;
      this.energy = Math.min(this.energy + 40, 100);
      this.happiness = Math.max(this.happiness - 10, 0);
      this.fullness = Math.max(this.fullness - 10, 0);
      this.animateBounce();
      this.updateUI();
      const timeElapsed = getElapsedTime(this.startTime);
      this.activities.push(`Took a nap (${timeElapsed})`);
      logActivity(`${this.name} took a nap (${timeElapsed})`, "info");
    }
  
    play() {
      if (!this.alive) return;
      this.happiness = Math.min(this.happiness + 30, 100);
      this.fullness = Math.max(this.fullness - 10, 0);
      this.energy = Math.max(this.energy - 10, 0);
      this.animateBounce();
      this.updateUI();
      const timeElapsed = getElapsedTime(this.startTime);
      this.activities.push(`Played happily (${timeElapsed})`);
      logActivity(`${this.name} played happily (${timeElapsed})`, "success");
    }
  
    eat() {
      if (!this.alive) return;
      this.fullness = Math.min(this.fullness + 30, 100);
      this.happiness = Math.min(this.happiness + 5, 100);
      this.energy = Math.max(this.energy - 15, 0);
      this.animateBounce();
      this.updateUI();
      const timeElapsed = getElapsedTime(this.startTime);
      this.activities.push(`Ate food (${timeElapsed})`);
      logActivity(`${this.name} ate food (${timeElapsed})`, "success");
    }
  
    animateBounce() {
      const image = this.petElement.querySelector(".pet-image");
      image.classList.add("animate-bounce");
      setTimeout(() => image.classList.remove("animate-bounce"), 1000);
    }
  }
  
  class Game {
    static pets = {};
  
    static addPet(name, animalType) {
      if (Object.keys(Game.pets).length >= 4) {
        alert("You can only have up to 4 pets!");
        return;
      }
      if (!name.trim()) {
        name = Animal.generateName();
      }
      if (Game.pets[name]) {
        alert("A pet with this name already exists!");
        return;
      }
      Game.pets[name] = new Animal(name, animalType);
    }
  
    static resetGame() {
      Object.values(Game.pets).forEach((pet) => clearInterval(pet.decayInterval));
      document.getElementById("pet-list").innerHTML = "";
      document.getElementById("log-list").innerHTML = "";
      Game.pets = {};
      logActivity("Game has been reset!", "warning");
    }
  }
  
  function logActivity(message, type = "default") {
    const logList = document.getElementById("log-list");
    const logItem = document.createElement("li");
    const time = new Date().toLocaleString();
    logItem.textContent = `[${time}] ${message}`;
    logItem.classList.add("log-item", type);
    logList.appendChild(logItem);
  }
  
  function getElapsedTime(startTime) {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    return seconds < 60 ? `${seconds} sec` : `${Math.floor(seconds / 60)} min`;
  }
  
  document.getElementById("add-pet").addEventListener("click", () => {
    const name = document.getElementById("pet-name").value.trim();
    const animalType = document.getElementById("pet-type").value;
    Game.addPet(name, animalType);
  });
  
  document.getElementById("reset-game").addEventListener("click", () => {
    Game.resetGame();
  });