export class TamagotchiImage {
    constructor(species, getStatus) {
        this.species = species;
        this.getStatus = getStatus;
        this.mode = 'internal'; // 'internal' | 'external'

        this.element = document.createElement('img');
        this.internalImage = `img/${species}/idle.png`; // default
        this.element.src = this.internalImage;

        this.startMonitoringStatus();
    }

    getElement() {
        return this.element;
    }

    /**
     * Override image from external source (e.g., animation).
     * Pass "internal" to revert control back to status-based logic.
     */
    setImage(srcOrMode) {
        if (srcOrMode === 'internal') {
            this.mode = 'internal';
        } else {
            this.mode = 'external';
            this.element.src = srcOrMode;
        }
    }

    /**
     * Periodically checks the tamagotchi status to update the image
     * if it's in internal mode.
     */
    startMonitoringStatus() {
        this.statusTimer = setInterval(() => {
            if (this.mode !== 'internal') return;

            const status = this.getStatus?.();
            if (!status) return;

            const expected = status.alive
                ? `img/${this.species}/idle.png`
                : `img/${this.species}/dead.png`;

            if (this.element.src !== expected) {
                this.element.src = expected;
            }
        }, 1000);
    }

    stopMonitoring() {
        clearInterval(this.statusTimer);
    }
}