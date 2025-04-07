import { Tamagotchi } from './Tamagotchi.js';
import { TamagotchiWrapper } from './TamagotchiWrapper.js';
import { findUniqueName, speciesList } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const addBtn = document.getElementById('add-btn');
    const speciesSelect = document.getElementById('species-select');
    const tamagotchis = new Map();
    speciesList.forEach(species => {
        const option = document.createElement('option');
        option.value = species;
        option.textContent = species[0].toUpperCase() + species.slice(1);
        speciesSelect.appendChild(option);
    });

    addBtn.addEventListener('click', () => {
        if (tamagotchis.size >= 4) return;

        const name = findUniqueName([...tamagotchis.keys()]);
        const species = speciesSelect.value;

        const tamagotchi = new Tamagotchi(name, species);
        const wrapper = new TamagotchiWrapper(tamagotchi, tamagotchis);
        tamagotchis.set(name, wrapper);
        container.appendChild(wrapper.getElement());
        console.log(`Added: ${name} the ${species}`);
    });
});
