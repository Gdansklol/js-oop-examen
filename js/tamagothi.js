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

window.findUniqueName = findUniqueName;
window.speciesList = speciesList;