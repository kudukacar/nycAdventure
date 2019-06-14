import Walker from "./walker";

class Game {
    constructor(ctx, document, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.document = document;
        this.x = [400, 800, 1200];
        this.dx = 2;
        this.intervalTime = [15, 15, 15];
        this.poopIntervals = [this.movePoopInterval0, this.movePoopInterval1, this.movePoopInterval2];
        this.checkGameOverInterval;
        this.walker = new Walker(this.ctx);
        this.gameOver = false;
    }

    drawPoop(i) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x[i] - 50, 390);
        this.ctx.quadraticCurveTo(this.x[i] - 40, 350, this.x[i] - 60, 380);
        this.ctx.quadraticCurveTo(this.x[i] - 80, 390, this.x[i] - 50, 390);
        this.ctx.quadraticCurveTo(this.x[i] - 10, 390, this.x[i], 385);
        this.ctx.quadraticCurveTo(this.x[i] - 70, 350, this.x[i] - 50, 390);
        this.ctx.fillStyle = "saddlebrown";
        this.ctx.fill();
    }

    movePoop(i) {
        this.poopIntervals[i] = setInterval(() => {
            this.ctx.clearRect(this.x[i] - 80, 350, 90, 90);
            this.drawPoop(i);
            if (this.x[i] === 0) {
                this.x[i] = 1200;
            }
            const collision = this.walker.xPosition() >= this.xPositionEnd(i) && this.walker.xPosition() <= this.x[i];
            if (this.walker.yPosition() >= this.yPositionStart() && collision) {
                this.gameOver = true;
            }

            if(this.gameOver === true) {
                clearInterval(this.poopIntervals[i]);
            }
            if (this.walker.xPosition() >= 1100) {
                clearInterval(this.poopIntervals[i]);
                this.canvas.style.animationPlayState = 'paused';
            }
            this.x[i] -= this.dx;
        }, this.intervalTime[i])
    }

    checkGameOver() {
        this.checkGameOverInterval = setInterval(() => {
            if (this.gameOver === true) {
                this.walker.collision();
                this.canvas.style.animationPlayState = 'paused';
                this.ctx.font = "34px sans-serif";
                this.ctx.fillStyle = "black";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Find a patch of grass to clean your shoes!", canvas.width / 2, canvas.height / 2);
            }
            if(this.gameOver === true) {
                clearInterval(this.checkGameOverInterval);
            }
        }, 5)
    }

    xPositionEnd(i) {
        return this.x[i] - 55;
    }

    yPositionStart() {
       return 385
    }

    play() {
        for(let i = 0; i < this.x.length; i++) {
            this.movePoop(i);
        }
        this.walker.walk();
        this.checkGameOver();
        return this.document.addEventListener('keypress', (e) => {
            e.preventDefault();
            if (e.keyCode === 32) {
                return this.walker.jump();
            }
        })
    }
}

export default Game;