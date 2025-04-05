const nameSuggestions = [
    "Tamagotchi", "Mametchi", "Kuchipatchi", "Memetchi", "Gozarutchi",
    "Lovelitchi", "Maskutchi", "Nyatchi", "Sebiretchi", "Mimitchi"
];

const speciesList = ["dog", "cat", "dragon", "alien"];

function findUniqueName(existingNames) {
    for (const name of nameSuggestions) {
        if (!existingNames.includes(name)) return name;
    }

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
        this.image.src = `images/${this.species}/idle.png`;
    }

    feed() {
        console.log(`${this.id} is being fed`);
    }

    play() {
        console.log(`${this.id} is playing`);
    }

    sleep() {
        console.log(`${this.id} is sleeping`);
    }

    log() {
        console.log(`${this.id}'s log`);
    }

    delete() {
        console.log(`${this.id} has been deleted`);
    }
}

window.findUniqueName = findUniqueName;
window.speciesList = speciesList;
window.Tamagotchi = Tamagotchi;