class LogRow {
    constructor({ timestamp, text }) {
        this.element = document.createElement('div');
        this.element.className = 'log-entry';
        this.element.textContent = `[${timestamp}] ${text}`;
    }

    getElement() {
        return this.element;
    }
}

export class LogContainer {
    constructor(getLog) {
        this.getLog = getLog;
        this.visible = false;
        this.lastCount = 0;

        this.element = document.createElement('div');
        this.element.className = 'log-container';
        this.element.style.display = 'none';

        this.startLogMonitor();
    }

    getElement() {
        return this.element;
    }

    toggle() {
        this.visible = !this.visible;
        this.element.style.display = this.visible ? 'block' : 'none';

        if (this.visible) {
            this.render(); // full render on show
        }
    }

    render() {
        const log = this.getLog?.() || [];

        this.element.innerHTML = '';
        log.forEach(entry => {
            const row = new LogRow(entry);
            this.element.appendChild(row.getElement());
        });

        this.lastCount = log.length;
    }

    startLogMonitor() {
        this.timer = setInterval(() => {
            if (!this.visible) return;

            const log = this.getLog?.() || [];
            if (log.length > this.lastCount) {
                const newEntries = log.slice(this.lastCount);
                newEntries.forEach(entry => {
                    const row = new LogRow(entry);
                    this.element.appendChild(row.getElement());
                });
                this.lastCount = log.length;
            }
        }, 1000);
    }

    stopLogMonitor() {
        clearInterval(this.timer);
    }
}