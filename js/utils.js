export const nameSuggestions = [
    "Tamagotchi", "Mametchi", "Kuchipatchi", "Memetchi", "Gozarutchi",
    "Lovelitchi", "Maskutchi", "Nyatchi", "Sebiretchi", "Mimitchi"
];

export const speciesList = ["dog", "cat", "dragon", "alien"];

/**
 * Finds a unique name not already in use.
 * @param {string[]} existingNames - Array of names currently taken.
 * @returns {string} - A unique name suggestion.
 */
export function findUniqueName(existingNames) {
    const shuffled = [...nameSuggestions].sort(() => Math.random() - 0.5);

    for (const name of shuffled) {
        if (!existingNames.includes(name)) return name;
    }

    let i = 1;
    while (true) {
        const fallback = `Tama${i}`;
        if (!existingNames.includes(fallback)) return fallback;
        i++;
    }
}