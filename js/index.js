const container = document.getElementById('container');
const addBtn = document.getElementById('add-btn');
const nameInput = document.getElementById('name-input');
const typeSelect = document.getElementById('type-select');

const tamagotchis = new Map();

window.addEventListener('DOMContentLoaded', () => {
    const typeSelect = document.getElementById('type-select');
    speciesList.forEach(species => {
        const option = document.createElement('option');
        option.value = species;
        option.textContent = species[0].toUpperCase() + species.slice(1);
        typeSelect.appendChild(option);
    });
});

addBtn.addEventListener('click', () => {
    const name = findUniqueName(Array.from(tamagotchis.keys()));
    const species = typeSelect.value;
    const wrapper = createTamagotchiWrapper(name, species);

    container.appendChild(wrapper);
    tamagotchis.set(name, { name, species });
});

function createTamagotchiWrapper(name, species) {
    const wrapper = document.createElement('div');
    wrapper.className = 'tamagotchi';
    wrapper.id = name;
    wrapper.appendChild(createTamagotchiTitle(name, species));
    wrapper.appendChild(createTamagotchiImage());
    wrapper.appendChild(createActionRow(['Feed', 'Play', 'Sleep']));
    wrapper.appendChild(createActionRow(['Log', 'Delete']));
    return wrapper;
}

function createTamagotchiTitle(name, species) {
    const title = document.createElement('div');
    title.className = 'tamagotchi-name';
    title.textContent = `${name} the ${species}`;
    return title;
}


function createTamagotchiImage() {
    const img = document.createElement('img');
    img.src = 'img/under-construction.png';
    return img;
}

function createActionRow(labels) {
    const row = document.createElement('div');
    row.className = 'button-row';

    labels.forEach(label => {
        const btn = document.createElement('button');
        btn.textContent = label;
        row.appendChild(btn);
    });

    return row;
}

