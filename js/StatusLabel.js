export class StatusLabel {
    //<div class="status-line">
    //  <label>${label}:</label>
    //  <span id=${id}>${value}</span>
    // </div>
    constructor(label, id) {
        this.id = id;

        this.root = document.createElement('div');
        this.root.className = 'status-line';

        const labelEl = document.createElement('label');
        labelEl.textContent = `${label}:`;

        this.valueEl = document.createElement('span');
        this.valueEl.id = id;
        this.valueEl.textContent = '0';

        this.root.appendChild(labelEl);
        this.root.appendChild(this.valueEl);
    }

    update(value) {
        this.valueEl.textContent = value;
    }

    getElement() {
        return this.root;
    }
}