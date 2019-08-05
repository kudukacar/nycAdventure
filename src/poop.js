class Poop {
    constructor(x, ctx) {
        this.x = x;
        this.ctx = ctx;
        this.dx = 2;
        this.poopInterval;
        this.gameOver = false;
        window.requestAnimFrame = (function(callback) {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                this.poopInterval = window.setInterval(callback, 10);
            }
        })();
        window.cancelAnimFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearInterval(this.poopInterval);
    }

    drawPoop() {
        this.ctx.clearRect(this.x - 60, 350, 65, 65);
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - 50, 390);
        this.ctx.quadraticCurveTo(this.x - 40, 350, this.x - 60, 380);
        this.ctx.quadraticCurveTo(this.x - 80, 390, this.x - 50, 390);
        this.ctx.quadraticCurveTo(this.x - 10, 390, this.x, 385);
        this.ctx.quadraticCurveTo(this.x - 70, 350, this.x - 50, 390);
        this.ctx.fillStyle = "saddlebrown";
        this.ctx.fill();
        if(this.x === 0) {
            this.x = 1200;
        }
        this.x -= this.dx;
        this.poopInterval = requestAnimFrame(() => this.drawPoop());
    }

    movePoop() {
        this.poopInterval = requestAnimFrame(() => this.drawPoop());
    }

    xPositionEnd() {
        return this.x - 56;
    }

    yPositionStart() {
        return 385
    }

    collision() {
        this.gameOver = true;
        cancelAnimFrame(this.poopInterval);
    }
}

export default Poop;