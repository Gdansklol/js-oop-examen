import { AnimationPlayer } from "./AnimationPlayer.js";
import { StatusPanel } from './StatusPanel.js';
import { ButtonRow } from './ButtonRow.js';
import { TitleRow } from './TitleRow.js';
import { TamagotchiImage } from './TamagotchiImage.js';
import { LogContainer } from './LogContainer.js';

export class TamagotchiWrapper {
    constructor(tamagotchi, tamagotchis) {
        this.tamagotchi = tamagotchi;
        this.tamagotchis = tamagotchis;
        this.id = tamagotchi.id;
        this.species = tamagotchi.species;

        this.root = document.createElement('div');
        this.root.className = 'tamagotchi';
        this.root.id = this.id;

        this.title = new TitleRow(this.id, this.species);
        this.image = new TamagotchiImage(this.species, () => this.tamagotchi.getStatus());
        this.statusPanel = new StatusPanel(this.id, () => this.tamagotchi.getStatus());

        this.actionRow = new ButtonRow([
            { title: 'Eat', action: this.onEat.bind(this) },
            { title: 'Play', action: this.onPlay.bind(this) },
            { title: 'Nap', action: this.onNap.bind(this) }
        ], () => this.tamagotchi.getStatus());

        this.utilityRow = new ButtonRow([
            { title: 'Log', action: this.onLog.bind(this) },
            { title: 'Delete', action: this.onDelete.bind(this) }
        ]);

        this.logContainer = new LogContainer(() => this.tamagotchi.getLog());

        this.root.appendChild(this.title.getElement());
        this.root.appendChild(this.statusPanel.getElement());
        this.root.appendChild(this.image.getElement());
        this.root.appendChild(this.actionRow.getElement());
        this.root.appendChild(this.utilityRow.getElement());
        this.root.appendChild(this.logContainer.getElement());
    }

    getElement() {
        return this.root;
    }

    onEat() {
        if(this.tamagotchi.busy) return;
        this.tamagotchi.setBusy(true);
        AnimationPlayer.animateImage(this.image.getElement(), this.tamagotchi.animations.eat)
            .then(() => {
                this.tamagotchi.eat();
                this.image.setImage('internal');
                this.tamagotchi.setBusy(false);
        });
    }

    onPlay() {
        if(this.tamagotchi.busy) return;
        this.tamagotchi.setBusy(true);
        AnimationPlayer.animateImage(this.image.getElement(), this.tamagotchi.animations.play)
        .then(() => {
            this.tamagotchi.play();
            this.image.setImage('internal');
            this.tamagotchi.setBusy(false);
        });
    }

    onNap() {
        if(this.tamagotchi.busy) return;
        this.tamagotchi.setBusy(true);
        AnimationPlayer.animateImage(this.image.getElement(), this.tamagotchi.animations.nap)
        .then(() => {
            this.tamagotchi.nap();
            this.image.setImage('internal');
            this.tamagotchi.setBusy(false);
        });
    }

    onLog() {
        this.logContainer.toggle();
    }

    onDelete() {
        this.tamagotchi.delete();
        this.root.remove();
        this.tamagotchis.delete(this.id);
    }
}