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

    const tama = new Tamagotchi(wrapper, species);
    tamagotchis.set(name, tama);

    hookButtonsToTamagotchi(wrapper, tama);
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

function hookButtonsToTamagotchi(wrapper, tamagotchi) {
    const buttons = wrapper.querySelectorAll('button');

    buttons.forEach(btn => {
        const label = btn.textContent.toLowerCase();

        if (label === 'feed') {
            btn.onclick = () => tamagotchi.feed();
        } else if (label === 'play') {
            btn.onclick = () => tamagotchi.play();
        } else if (label === 'sleep') {
            btn.onclick = () => tamagotchi.sleep();
        } else if (label === 'log') {
            btn.onclick = () => tamagotchi.log();
        } else if (label === 'delete') {
            btn.onclick = () => {
                tamagotchi.delete();
                wrapper.remove();
                tamagotchis.delete(tamagotchi.id);
            };
        }
    });
}