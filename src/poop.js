class Poop {
    constructor(ctx) {
        this.x = 1200;
        this.ctx = ctx;
        this.dx = 2;

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
        setInterval(() => {
            this.ctx.clearRect(this.x - 80, 350, 90, 90);
            this.drawPoop();
            if(this.x === 0) {
                this.x = 1200;
            }
            this.x -= this.dx;
        }, 15)


    }
}

export default Poop;