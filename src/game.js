import Walker from "./walker";
import Sound from "./sound";
import Poop from "./poop";

class Game {
    constructor(ctx, document, canvas, time) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.document = document;
        this.time = time;
        this.poop1 = new Poop(400, this.ctx);
        this.poop2 = new Poop(800, this.ctx);
        this.poop3 = new Poop(1200, this.ctx);
        this.checkGameOverInterval;
        this.walker = new Walker(this.ctx, this.document, this.time);
        this.poopSound = new Sound("sounds/sound2.mp4", this.document);
        this.gameOver = false;
    }

    checkGameOver() {
        this.checkGameOverInterval = setInterval(() => {
            const collision1 = this.walker.xPosition() >= this.poop1.xPositionEnd() && this.walker.xPosition() <= this.poop1.x;
            const collision2 = this.walker.xPosition() >= this.poop2.xPositionEnd() && this.walker.xPosition() <= this.poop2.x;
            const collision3 = this.walker.xPosition() >= this.poop3.xPositionEnd() && this.walker.xPosition() <= this.poop3.x;
            
            
            if (this.walker.yPosition() >= this.poop1.yPositionStart() && (collision1 || collision2 || collision3)) {
                this.poopSound.play();
                this.gameOver = true;
            }

            if (this.gameOver === true) {
                this.poop1.collision();
                this.poop2.collision();
                this.poop3.collision();
                this.walker.collision();
                this.canvas.style.animationPlayState = 'paused';
                this.ctx.font = "34px sans-serif";
                this.ctx.fillStyle = "black";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Find a patch of grass to clean your shoes!", canvas.width / 2, canvas.height / 4 );
                setTimeout(() => {
                    this.document.location.reload();
                }, 2500)
            }
            if(this.gameOver === true) {
                clearInterval(this.checkGameOverInterval);
            }
            if (this.walker.dx >= 950) {
                clearInterval(this.poop1.poopInterval);
                clearInterval(this.poop2.poopInterval);
                clearInterval(this.poop3.poopInterval);
                this.canvas.style.animationPlayState = 'paused';
            }
        }, 1)
    }

    play() {
        this.poop1.movePoop();
        this.poop2.movePoop();
        this.poop3.movePoop();
        this.walker.walk();
        this.checkGameOver();
        return this.document.addEventListener('keypress', (e) => {
            e.preventDefault();
            if (e.keyCode === 32 && this.walker.jumping === false) {
                return this.walker.jump();
            }
        })
    }
}

export default Game;