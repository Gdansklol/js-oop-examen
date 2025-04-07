export class StatusBar {
    constructor(label, id) {
        this.id = id;

        this.root = document.createElement('div');
        this.root.className = 'status-line';

        const labelEl = document.createElement('label');
        labelEl.textContent = `${label}:`;

        const barContainer = document.createElement('div');
        barContainer.className = 'bar';

        this.barFill = document.createElement('div');
        this.barFill.className = 'bar-fill';
        this.barFill.id = id;

        barContainer.appendChild(this.barFill);
        this.root.appendChild(labelEl);
        this.root.appendChild(barContainer);
    }

    update(value, max = 100) {
        const percent = Math.max(0, Math.min(100, (value / max) * 100));
        this.barFill.style.width = `${percent}%`;
    }

    getElement() {
        return this.root;
    }
}
