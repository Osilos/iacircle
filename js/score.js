class Score {
    constructor(name, position, color) {
        this.name = name;
        this.x = position;
        this.color = color;
        this.value = 0;
    }

    update(value) {
        if (this.value < value) this.value = value;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.textAlign = 'left';
        context.font = '30px Arial ' + this.color;
        const text = this.name + ': ' + (this.value ? this.value : '...');
        context.fillText(text, this.x, 40);
    }
}

export default Score;
