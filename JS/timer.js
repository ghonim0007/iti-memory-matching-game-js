import { formatTime } from './utils.js';

export class GameTimer {
    constructor(onUpdate) {
        this.seconds = 0;
        this.interval = null;
        this.onUpdate = onUpdate;
    }

    start() {
        this.seconds = 0;
        this.interval = setInterval(() => {
            this.seconds++;
            this.onUpdate(formatTime(this.seconds));
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    reset() {
        this.stop();
        this.seconds = 0;
        this.onUpdate(formatTime(0));
    }

    getTime() {
        return this.seconds;
    }

    getFormattedTime() {
        return formatTime(this.seconds);
    }
}