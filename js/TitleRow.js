export class TitleRow {
    constructor(name, species) {
        this.element = document.createElement('div');
        this.element.className = 'tamagotchi-name';
        this.element.textContent = `${name} the ${species}`;
    }

    getElement() {
        return this.element;
    }

    update(name, species) {
        this.element.textContent = `${name} the ${species}`;
    }
}