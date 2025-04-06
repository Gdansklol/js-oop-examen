export class StatusPanel {
    constructor(id, getStatus) {
        this.id = id;
        this.getStatus = getStatus;

        this.element = document.createElement('div');
        this.element.className = 'status-panel';

        this.element.innerHTML = `
            <div class="status-line"><label>Age:</label><span id="${id}-age">0</span></div>
            <div class="status-line"><label>Fullness:</label><div class="bar"><div id="${id}-fullness" class="bar-fill"></div></div></div>
            <div class="status-line"><label>Energy:</label><div class="bar"><div id="${id}-energy" class="bar-fill"></div></div></div>
            <div class="status-line"><label>Happiness:</label><div class="bar"><div id="${id}-happiness" class="bar-fill"></div></div></div>
        `;

        this.startStatusUpdates();
    }

    getElement() {
        return this.element;
    }

    startStatusUpdates() {
        this.statusTimer = setInterval(() => {
            const status = this.getStatus?.();
            if (!status) return;

            const get = (key) => document.getElementById(`${this.id}-${key}`);
            if (!get('age')) return;

            get('age').textContent = status.age;
            get('fullness').style.width = `${(status.fullness / status.maxFullness) * 100}%`;
            get('energy').style.width = `${(status.energy / status.maxEnergy) * 100}%`;
            get('happiness').style.width = `${(status.happiness / status.maxHappiness) * 100}%`;
        }, 1000);
    }

    stopStatusUpdates() {
        clearInterval(this.statusTimer);
    }
}