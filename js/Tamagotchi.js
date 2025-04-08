import {AnimationPlayer} from'./AnimationPlayer.js';

const FRAMES = 15;
const MAX_HAPPINESS = 50;
const MAX_FULLNESS = 50;
const MAX_ENERGY = 50;

export class Tamagotchi {
    constructor(id, species) {
        this.id = id;
        this.name = this.id;
        this.species = species;

        this.animations = AnimationPlayer.getAnimations(this.species);

        this.age = 0;
        this.energy = MAX_ENERGY;
        this.fullness = MAX_FULLNESS;
        this.happiness = MAX_HAPPINESS;
        this.alive = true;
        this.busy = false;

        this.logEntries = [];
        this.startLifeTimer();
    }

    startLifeTimer() {
        this.lifeTimer = setInterval(() => {
            console.log(this.name);
            if (!this.alive) return;

            this.age += 1;
            this.energy = Math.max(0, this.energy - 15 / FRAMES);
            this.fullness = Math.max(0, this.fullness - 15 / FRAMES);
            this.happiness = Math.max(0, this.happiness - 15 / FRAMES);

            this.checkAlive();
            this.pushUpdate();
        }, 10000 / FRAMES);
    }

    // Activities
    eat() {
        if (!this.alive) return;
        this.fullness = Math.min(MAX_FULLNESS, this.fullness + 30);
        this.happiness = Math.min(MAX_HAPPINESS, this.happiness + 5);
        this.energy = Math.max(0, this.energy - 15);
        this.addLogEntry(`You ate with ${this.name}!`);
        this.pushUpdate();
    }

    nap() {
        if (!this.alive) return;
        this.energy = Math.min(MAX_ENERGY, this.energy + 40);
        this.happiness = Math.max(0, this.happiness - 10);
        this.fullness = Math.max(0, this.fullness - 10);
        this.addLogEntry(`You took a nap with ${this.name}!`);
        this.pushUpdate();
    }

    play() {
        if (!this.alive) return;
        this.happiness = Math.min(MAX_HAPPINESS, this.happiness + 30);
        this.energy = Math.max(0, this.energy - 10);
        this.fullness = Math.max(0, this.fullness - 10);
        this.addLogEntry(`You played with ${this.name}!`);
        this.pushUpdate();
    }

    checkAlive() {
        if (this.energy <= 0 || this.fullness <= 0 || this.happiness <= 0) {
            this.alive = false;
            clearInterval(this.lifeTimer);
            this.addLogEntry(`${this.name} ran away due to neglect 😢`);
        }
    }

    setBusy(value) {
        this.busy = value;
        this.pushUpdate();
    }

    delete() {
        clearInterval(this.lifeTimer);
        this.energy = 0;
        this.happiness = 0;
        this.fullness = 0;
        this.alive = false;
        this.addLogEntry(`${this.name} was deleted.`);
    }

    addLogEntry(text) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = { text, timestamp };
        this.logEntries.push(entry);

        if (typeof this.onLog === 'function') {
            this.onLog(entry);
        }
    }

    getLog() {
        return [...this.logEntries];
    }

    getStatus() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            energy: this.energy,
            fullness: this.fullness,
            happiness: this.happiness,
            maxEnergy: MAX_ENERGY,
            maxFullness: MAX_FULLNESS,
            maxHappiness: MAX_HAPPINESS,
            alive: this.alive,
            busy: this.busy
        };
    }

    pushUpdate() {
        if (typeof this.onStatus === 'function') {
            this.onStatus(this.getStatus());
        }
    }
}