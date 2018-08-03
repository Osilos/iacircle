import Agent from './agent.js';

class IA {
    constructor(width, height, walls, maxGeneration, color, context) {
        this.width = width;
        this.height = height;
        this.walls = walls;
        this.populationSize = 1000;
        this.selectionSize = 50;
        this.color = color;
        this.context = context;

        console.log(this.color);

        this.bigger = { size: 1 };

        this.generation = 1;
        this.bestGeneration = 1;
        this.stopGeneration = 1000;
        this.maxGeneration = maxGeneration;

        this.population = this.createNewPopulation();
    }

    isNotDone() {
        return this.generation - this.bestGeneration < this.stopGeneration;
    }

    iterate() {
        if (this.isNotDone()) {
            this.scorePopulation();

            this.selection();
            this.reproduction();
            this.generation++;
        } else {
            console.log(this.generation);
        }
    }

    drawPopulation() {
        this.population.forEach(element => {
            this.context.beginPath();
            let best = element.size === this.bigger.size;

            this.context.arc(
                element.x,
                element.y,
                element.size,
                0,
                2 * Math.PI
            );
            this.context.stroke();
        });
    }

    createNewPopulation() {
        let population = [];
        for (let i = 0; i < this.populationSize; i++) {
            let x = Math.round(Math.random() * this.width);
            let y = Math.round(Math.random() * this.height);
            let size = Math.round(Math.random() * this.height);
            population.push(new Agent(x, y, this.color));
        }
        return population;
    }

    reproduction() {
        let newPopulation = [];
        newPopulation.push(this.population[this.population.length - 1]);

        while (newPopulation.length - 1 < this.populationSize) {
            const indexA = this.getIndex();
            const indexB = this.getIndex();
            if (indexA === indexB) continue;

            let newAgents = this.population[indexA].getMix(
                this.population[indexB].adn
            );
            newAgents = newAgents.map(agent => agent.getMutation());
            newPopulation = newPopulation.concat(newAgents);
        }

        this.population = newPopulation;
    }

    getIndex() {
        let sum = 0;
        this.population.forEach(agent => (sum += agent.score));
        let random = Math.random() * sum;
        for (let i = 0; i < this.population.length; i++) {
            random -= this.population[i].score;
            if (random < 0) {
                return i;
            }
        }
        return this.population.length - 1;
    }
    selection() {
        this.population = this.population.sort(function(a, b) {
            return a.score - b.score;
        });
        if (
            this.population[this.population.length - 1].size > this.bigger.size
        ) {
            this.bigger = this.population[this.population.length - 1];
            this.bestGeneration = this.generation;
        }

        this.population = this.population.slice(
            this.population.length - this.selectionSize
        );
        this.drawPopulation();
    }

    scorePopulation() {
        this.population.forEach(agent => {
            agent.calculateScore(
                this.walls,
                this.width,
                this.width,
                this.height
            );
        });
    }
}

export default IA;
