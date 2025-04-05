const nameSuggestions = [
    "Tamagotchi", "Mametchi", "Kuchipatchi", "Memetchi", "Gozarutchi",
    "Lovelitchi", "Maskutchi", "Nyatchi", "Sebiretchi", "Mimitchi"
];

const speciesList = ["dog", "cat", "dragon", "alien"];

function findUniqueName(existingNames) {
    const shuffled = [...nameSuggestions].sort(() => Math.random() - 0.5);

    for (const name of shuffled) {
        if (!existingNames.includes(name)) return name;
    }

    // Fallback (won't happen with max 4 unless nameSuggestions < 4)
    let i = 1;
    while (true) {
        const fallback = `Tama${i}`;
        if (!existingNames.includes(fallback)) return fallback;
        i++;
    }
}

class Tamagotchi {
    constructor(wrapper, species) {
        this.wrapper = wrapper;
        this.id = wrapper.id;
        this.species = species;
        this.image = wrapper.querySelector('img');
        this.image.src = `img/${this.species}/idle.png`;

        this.age = 0;
        this.hunger = 5;
        this.energy = 5;
        this.happiness = 5;
        this.alive = true;

        this.logEntries = [];
        this.onLog = null;
        this.onStatus = null;

        this.startLifeTimer();
    }

    startLifeTimer() {
        this.lifeTimer = setInterval(() => {
            if (!this.alive) return;

            this.age += 1;
            this.hunger = Math.min(10, this.hunger + 0.1);
            this.energy = Math.max(0, this.energy - 0.05);
            this.happiness = Math.max(0, this.happiness - 0.03);
            this.onStatus?.(this.getStatus());
            this.checkAlive();
        }, 1000);
    }

    checkAlive() {
        if (this.hunger >= 10 || this.energy <= 0 || this.happiness <= 0) {
            this.alive = false;
            clearInterval(this.lifeTimer);
            this.image.src = `img/${this.species}/dead.png`;
            this.log(`${this.id} has died 💀`);
        }
    }

    feed() {
        if (!this.alive) return;
        this.hunger = Math.max(0, this.hunger - 2);
        this.log(`${this.id} was fed 🍗`);
    }

    play() {
        if (!this.alive) return;
        this.happiness = Math.min(10, this.happiness + 1);
        this.energy = Math.max(0, this.energy - 1);
        this.log(`${this.id} played 🎮`);
    }

    sleep() {
        if (!this.alive) return;
        this.energy = Math.min(10, this.energy + 2);
        this.hunger = Math.min(10, this.hunger + 0.5);
        this.log(`${this.id} slept 😴`);
    }

    log(message = `${this.id}'s status:`) {
        console.log(message);
        console.log(`  Age: ${this.age}`);
        console.log(`  Hunger: ${this.hunger.toFixed(1)}`);
        console.log(`  Energy: ${this.energy.toFixed(1)}`);
        console.log(`  Happiness: ${this.happiness.toFixed(1)}`);
    }

    delete() {
        console.log(`${this.id} has been removed`);
        clearInterval(this.lifeTimer);
        this.alive = false;
    }

    getStatus() {
        return {
            id: this.id,
            age: this.age,
            hunger: this.hunger,
            energy: this.energy,
            happiness: this.happiness,
            alive: this.alive
        };
    }

    log(text) {
        const timestamp = new Date().toLocaleTimeString();
        this.logEntries.push({ text, timestamp });

        if (typeof this.onLog === 'function') {
            this.onLog({ text, timestamp });
        }
    }

    getLog() {
        return [...this.logEntries];
    }
}

window.findUniqueName = findUniqueName;
window.speciesList = speciesList;
window.Tamagotchi = Tamagotchi;