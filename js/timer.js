class Timer {
    constructor(length) {
        this.length = length;
        this.reset();

        this.interval = setInterval(this.tick.bind(this), 100);
        this.timeLeft = length;
    }

    reset() {
        this.endtime = Date.now() + this.length * 1000;
    }

    tick() {
        this.timeLeft = this.endtime - Date.now();
        if (this.timeLeft <= 0) {
            this.clear();
        } else {
            this.timeLeft = Math.round(this.timeLeft / 100) / 10;
        }
    }

    clear() {
        clearInterval(this.interval);
        this.timeLeft = 0;
    }

    isDone() {
        return this.timeLeft === 0;
    }

    draw(context) {
        context.fillStyle = 'black';
        context.textAlign = 'left';
        context.font = '20px Arial';
        context.fillText(this.timeLeft + 's', context.canvas.width / 2, 25);
    }
}

export default Timer;
