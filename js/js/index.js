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
    if (tamagotchis.size >= 4) return; // limit to max 4

    const name = findUniqueName(Array.from(tamagotchis.keys()));
    const species = typeSelect.value;
    const wrapper = createTamagotchiWrapper(name, species);

    container.appendChild(wrapper);

    const tama = new Tamagotchi(wrapper, species);
    tamagotchis.set(name, tama);

    hookButtonsToTamagotchi(wrapper, tama);
    tama.onStatus = (status) => updateStatusPanel(status);
});



function createTamagotchiWrapper(name, species) {
    const wrapper = document.createElement('div');
    wrapper.className = 'tamagotchi';
    wrapper.id = name;
    wrapper.appendChild(createTamagotchiTitle(name, species));
    wrapper.appendChild(createStatusPanel(name));
    wrapper.appendChild(createTamagotchiImage());
    wrapper.appendChild(createActionRow(['Feed', 'Play', 'Sleep']));
    wrapper.appendChild(createActionRow(['Log', 'Delete']));
    wrapper.appendChild(createLogPane());
    return wrapper;
}

function createTamagotchiTitle(name, species) {
    const title = document.createElement('div');
    title.className = 'tamagotchi-name';
    title.textContent = `${name} the ${species}`;
    return title;
}

function createStatusPanel(id) {
    const panel = document.createElement('div');
    panel.className = 'status-panel';

    panel.innerHTML = `
    <div class="status-line"><label>Age:</label><span id="${id}-age">0</span></div>
    <div class="status-line"><label>Fullness:</label><div class="bar"><div id="${id}-fullness" class="bar-fill"></div></div></div>
    <div class="status-line"><label>Energy:</label><div class="bar"><div id="${id}-energy" class="bar-fill"></div></div></div>
    <div class="status-line"><label>Happiness:</label><div class="bar"><div id="${id}-happiness" class="bar-fill"></div></div></div>
  `;

    return panel;
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
            btn.onclick = () => tamagotchi.eat();
        } else if (label === 'play') {
            btn.onclick = () => tamagotchi.play();
        } else if (label === 'sleep') {
            btn.onclick = () => tamagotchi.nap();
        } else if (label === 'delete') {
            btn.onclick = () => {
                tamagotchi.delete();
                wrapper.remove();
                tamagotchis.delete(tamagotchi.id);
            };
        } else if (label === 'log') {
            btn.textContent = 'Show log'; // initial label

            btn.onclick = () => {
                const logDiv = wrapper.querySelector('.log-container');
                const isVisible = logDiv.style.display === 'block';
                logDiv.style.display = isVisible ? 'none' : 'block';
                btn.textContent = isVisible ? 'Show log' : 'Hide log';

                if (!isVisible) {
                    // Clear and repopulate the log view
                    logDiv.innerHTML = '';
                    const entries = tamagotchi.getLog();
                    entries.forEach(entry => {
                        const div = document.createElement('div');
                        div.className = 'log-entry';
                        div.textContent = `[${entry.timestamp}] ${entry.text}`;
                        logDiv.appendChild(div);
                    });
                }
            };
        }

    });
}

function createLogPane() {
    const div = document.createElement('div');
    div.className = 'log-container';
    div.style.display = 'none';
    return div;
}

function updateStatusPanel(status) {
    const get = (key) => document.getElementById(`${status.id}-${key}`);
    if (!get('age')) return;

    get('age').textContent = status.age;
    get('fullness').style.width = `${(status.fullness / status.maxFullness) * 100}%`;
    get('energy').style.width = `${(status.energy / status.maxEnergy) * 100}%`;
    get('happiness').style.width = `${(status.happiness / status.maxHappiness) * 100}%`;
}
