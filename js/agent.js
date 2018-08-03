import Circle from './circle';

const mutationRate = 1 / 30;
const geneSize = 12;

class Agent extends Circle {
    constructor(x, y, color) {
        super(x, y, color);
        this.size = 1;

        this.adn = this.encode(x, y);
        this.score = 0;
    }

    calculateScore(walls, maxSize, width, height) {
        let hasBadPosition = false;
        let shouldStop = false;

        while (this.size < maxSize && !shouldStop) {
            this.size++;
            if (this.hitBorder(width, height)) {
                shouldStop = true;
            } else {
                for (let i = 0; i < walls.length; i++) {
                    if (
                        this.getDistance(walls[i].position) <
                        this.size + walls[i].size
                    ) {
                        shouldStop = true;
                        break;
                    }
                }
            }
        }
        this.size--;

        // console.log('good position');
        this.score = this.size;
    }

    getMix(otherAdn) {
        const splitIndex = Math.floor(Math.random() * this.adn.length);
        let ag = this.createAgentFromAdn(
            this.adn.substring(0, splitIndex) + otherAdn.substring(splitIndex)
        );
        return [
            this.createAgentFromAdn(
                this.adn.substring(0, splitIndex) +
                    otherAdn.substring(splitIndex)
            ),
            this.createAgentFromAdn(
                otherAdn.substring(0, splitIndex) +
                    this.adn.substring(splitIndex)
            )
        ];
    }

    getMutation() {
        let baseAdn = this.adn.split('');
        let newAdn = [];
        let hasMutate = false;
        let startMutation = 0;
        let mutationIndex = Math.floor(Math.random() * baseAdn.length);
        for (let i = 0; i < baseAdn.length; i++) {
            if (Math.random() > mutationRate) {
                newAdn.push(parseInt(baseAdn[i]) ? 0 : 1);
            } else newAdn.push(baseAdn[i]);
        }
        // console.log(newAdn);
        return this.createAgentFromAdn(newAdn.join(''));
    }

    createAgentFromAdn(adn) {
        let decodeAdn = this.decode(adn);
        //console.log(decodeAdn);
        return new Agent(decodeAdn.x, decodeAdn.y);
    }

    encode(x, y) {
        return (
            this.fixSize(geneSize, this.decimalToBinary(x)) +
            this.fixSize(geneSize, this.decimalToBinary(y))
        );
    }

    fixSize(size, str) {
        let gene = str;
        // console.log(str);
        while (gene.length < size) {
            gene = '0' + gene;
        }
        // console.log(gene);
        return gene;
    }

    decimalToBinary(decimal) {
        let x = decimal;
        let res = [];

        while (x) {
            res.push(x % 2);
            x = Math.floor(x / 2);
        }

        res.reverse();
        return res.join('');
    }

    decode(adn) {
        let x = adn.substring(0, geneSize);
        let y = adn.substring(geneSize, adn.length);
        return {
            x: parseInt(x, 2),
            y: parseInt(y, 2)
        };
    }
}

export default Agent;
