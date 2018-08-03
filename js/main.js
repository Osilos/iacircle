import PlayerCircle from './circlePlayer.js';
import Timer from './timer.js';
import IA from './ia.js';
import Score from './score.js';

class App {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        this.maxWallSize = 10;
        this.minWallSize = 5;
        this.numberOfWall = 50;
        this.walls = this.createNewWalls();

        this.ia = new IA(
            this.width,
            this.height,
            this.walls,
            10000,
            'rgba(255,165,0,0.8)',
            this.context
        );

        this.iaScore = new Score('IA', this.width - 150, 'black');
        this.iaGeneration = new Score(
            'Génération',
            this.width / 2 - 75,
            'black'
        );
        window.requestAnimationFrame(this.update.bind(this));
    }

    update() {
        this.context.clearRect(0, 0, this.width, this.height);

        this.ia.iterate();

        this.iaScore.update(this.ia.bigger.size * 2);
        this.iaGeneration.update(this.ia.generation);

        this.drawWalls();

        this.iaScore.draw(this.context);
        this.iaGeneration.draw(this.context);
        this.ia.bigger.draw(this.context);

        if (this.ia.isNotDone())
            window.requestAnimationFrame(this.update.bind(this));
        else {
            this.drawEnd();
            document.addEventListener('click', start, { once: true });
        }
    }

    drawEnd() {
        this.context.fillStyle = 'black';
        this.context.font = '30px Arial black';
        this.context.fillText(
            'CLICK TO RESTART',
            this.width / 2,
            this.height / 2
        );
    }

    onPlayerClick(e) {
        if (!this.timer.isDone())
            this.circle = new PlayerCircle(
                e.clientX,
                e.clientY,
                'rgba(0,0,205, 0.8)'
            );
    }

    createNewWalls() {
        let walls = [];
        for (let i = 0; i < this.numberOfWall; i++) {
            walls.push(this.getNewWall());
        }
        return walls;
    }

    getNewWall() {
        return {
            position: {
                x: Math.round(Math.random() * this.width),
                y: Math.round(Math.random() * this.height)
            },
            size: Math.round(
                Math.random() * this.maxWallSize + this.minWallSize
            )
        };
    }

    drawWalls() {
        this.walls.forEach(element => {
            this.context.beginPath();
            this.context.fillStyle = 'red';
            this.context.arc(
                element.position.x,
                element.position.y,
                element.size,
                0,
                2 * Math.PI
            );
            this.context.fill();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('app');
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    start();
});

function start() {
    new App(document.getElementById('app'));
}
