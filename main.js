class Animal {
    constructor(name, animalType) {
        this.name = name;
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

    createPetElement() {
        const petList = document.getElementById("pet-list");

        this.petElement = document.createElement("li");
        this.petElement.classList.add("pet-card");
        this.petElement.innerHTML = `
            <img src="images/${this.animalType}.png" alt="${this.animalType}">
            <h3>${this.name} (${this.animalType})</h3>
            <progress class="energy-bar" max="100" value="${this.energy}"></progress>
            <p>Energy: <span class="energy">${this.energy}</span></p>
            <progress class="fullness-bar" max="100" value="${this.fullness}"></progress>
            <p>Fullness: <span class="fullness">${this.fullness}</span></p>
            <progress class="happiness-bar" max="100" value="${this.happiness}"></progress>
            <p>Happiness: <span class="happiness">${this.happiness}</span></p>
            <button onclick="Game.pets['${this.name}'].nap()">Nap</button>
            <button onclick="Game.pets['${this.name}'].play()">Play</button>
            <button onclick="Game.pets['${this.name}'].eat()">Eat</button>
        `;
        petList.appendChild(this.petElement);
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
            this.energy = Math.max(this.energy - 15, 0);
            this.fullness = Math.max(this.fullness - 15, 0);
            this.happiness = Math.max(this.happiness - 15, 0);
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
        let timeElapsed = getElapsedTime(this.startTime);
        this.activities.push(`Ran away (${timeElapsed})`);
        logActivity(`${this.name} ran away! | History: ${this.activities.join(", ")}`, "danger");
    }
}

class Tamagotchi extends Animal {
    constructor(name, animalType) {
        super(name, animalType);
    }

    nap() {
        if (!this.alive) return;
        this.energy = Math.min(this.energy + 40, 100);
        this.happiness = Math.max(this.happiness - 10, 0);
        this.fullness = Math.max(this.fullness - 10, 0);
        this.updateUI();
        let timeElapsed = getElapsedTime(this.startTime);
        this.activities.push(`Took a nap (${timeElapsed})`);
        logActivity(`${this.name} took a nap (${timeElapsed})`, "info");
    }

    play() {
        if (!this.alive) return;
        this.happiness = Math.min(this.happiness + 30, 100);
        this.fullness = Math.max(this.fullness - 10, 0);
        this.energy = Math.max(this.energy - 10, 0);
        this.updateUI();
        let timeElapsed = getElapsedTime(this.startTime);
        this.activities.push(`Played happily (${timeElapsed})`);
        logActivity(`${this.name} played happily (${timeElapsed})`, "success");
    }

    eat() {
        if (!this.alive) return;
        this.fullness = Math.min(this.fullness + 30, 100);
        this.happiness = Math.min(this.happiness + 5, 100);
        this.energy = Math.max(this.energy - 15, 0);
        this.updateUI();
        let timeElapsed = getElapsedTime(this.startTime);
        this.activities.push(`Ate food (${timeElapsed})`);
        logActivity(`${this.name} ate food (${timeElapsed})`, "success");
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
            alert("Enter a name for the pet!");
            return;
        }

        if (Game.pets[name]) {
            alert("A pet with this name already exists!");
            return;
        }

        Game.pets[name] = new Tamagotchi(name, animalType);
    }

    static resetGame() {
        Object.values(Game.pets).forEach(pet => clearInterval(pet.decayInterval));
        document.getElementById("pet-list").innerHTML = "";
        document.getElementById("log-list").innerHTML = "";
        Game.pets = {};
        logActivity("Game has been reset!", "warning");
    }
}

function logActivity(message, type = "default") {
    const logList = document.getElementById("log-list");
    const logItem = document.createElement("li");
    logItem.textContent = `${message} at ${new Date().toLocaleTimeString()}`;
    logItem.classList.add("log-item", type);
    logList.appendChild(logItem);
}

function getElapsedTime(startTime) {
    let seconds = Math.floor((Date.now() - startTime) / 1000);
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

