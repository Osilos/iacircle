class Circle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = 50;
    }

    getDistance(position) {
        let a = position.x - this.x;
        let b = position.y - this.y;

        return Math.sqrt(a * a + b * b);
    }

    hitBorder(width, height) {
        return (
            this.x - this.size < 0 ||
            this.y - this.size < 0 ||
            this.x + this.size > width ||
            this.y + this.size > height
        );
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = 'rgba(255,165,0,0.75)';
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();

        context.beginPath();
        context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        context.stroke();

        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(this.size * 2, this.x, this.y - 8);
    }
}

export default Circle;
