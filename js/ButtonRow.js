// ButtonRow.js

export class ButtonRow {
    constructor(buttonDefs = [], getStatus = null) {
        this.buttons = new Map();
        this.getStatus = getStatus;

        this.element = document.createElement('div');
        this.element.className = 'button-row';

        buttonDefs.forEach(({ title, action }) => {
            const key = title.toLowerCase();

            const btn = document.createElement('button');
            btn.textContent = title;
            btn.onclick = action;

            this.buttons.set(key, btn);
            this.element.appendChild(btn);
        });

        if (this.getStatus) {
            this.startStatusMonitor();
        }
    }

    getElement() {
        return this.element;
    }

    getButton(title) {
        return this.buttons.get(title.toLowerCase());
    }

    setEnabled(title, enabled) {
        const btn = this.getButton(title);
        if (btn) btn.disabled = !enabled;
    }

    setAllEnabled(enabled) {
        for (const btn of this.buttons.values()) {
            btn.disabled = !enabled;
        }
    }

    startStatusMonitor() {
        this.statusTimer = setInterval(() => {
            const status = this.getStatus?.();
            if (!status) return;

            const shouldDisable = !status.alive || status.busy;
            this.setAllEnabled(!shouldDisable);

            if (!status.alive) {
                this.stopStatusMonitor();
            }
        }, 1000);
    }

    stopStatusMonitor() {
        clearInterval(this.statusTimer);
    }
}