import Walker from "./walker";

class Game {
    constructor(ctx, document) {
        this.ctx = ctx;
        this.document = document;
        this.x = 1200;
        this.dx = 2;
        this.movePoopInterval;
        this.setPoopTimeout;
        this.walker = new Walker(this.ctx);
        this.gameOver = false;
    }

    drawPoop() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - 50, 390);
        this.ctx.quadraticCurveTo(this.x - 40, 350, this.x - 60, 380);
        this.ctx.quadraticCurveTo(this.x - 80, 390, this.x - 50, 390);
        this.ctx.quadraticCurveTo(this.x - 10, 390, this.x, 385);
        this.ctx.quadraticCurveTo(this.x - 70, 350, this.x - 50, 390);
        this.ctx.fillStyle = "saddlebrown";
        this.ctx.fill();
    }

    movePoop() {
        this.movePoopInterval = setInterval(() => {
            this.ctx.clearRect(this.x - 80, 350, 90, 90);
            this.drawPoop();
            if(this.x === 0) {
                this.x = 1200;
            }
            const collision = this.walker.xPosition() >= this.xPositionEnd() && this.walker.xPosition() <= this.x;
            if (this.walker.yPosition() >= this.yPositionStart() && collision) {
                this.gameOver = true;
            } 
            if(this.gameOver === true) {
                clearInterval(this.movePoopInterval);
                this.walker.collision();
                alert('Find a patch of grass to clean your shoes')
            }
            if(this.walker.xPosition() >= 1100) {
                clearInterval(this.movePoopInterval);
            }
            this.x -= this.dx;
        }, 10)
    }

    xPositionEnd() {
        return this.x - 60;
    }

    yPositionStart() {
       return 385
    }

    play() {
        this.movePoop();
        this.walker.walk();
        return document.addEventListener('keypress', (e) => {
            e.preventDefault();
            if (e.keyCode === 32) {
                return this.walker.jump();
            }
        })
    }
}

export default Game;