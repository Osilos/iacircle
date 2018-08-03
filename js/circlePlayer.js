import Circle from './circle.js';

class PlayerCircle extends Circle {
    constructor(x, y, color) {
        super(x, y, color);
    }

    update(walls, width, height) {
        let shouldGrow = true;
        if (this.hitBorder(width, height)) {
            shouldGrow = false;
        } else {
            for (let i = 0; i < walls.length; i++) {
                if (
                    this.getDistance(walls[i].position) <
                    this.size + walls[i].size
                ) {
                    shouldGrow = false;
                    break;
                }
            }
        }
        if (shouldGrow) this.size++;
    }
}

export default PlayerCircle;
