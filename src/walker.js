class Walker {
    constructor(ctx) {
        this.ctx = ctx;
        this.figure = new Image();
        this.figure.src = 'images/walker4.png';
        this.jumper = new Image();
        this.jumper.src = 'images/jumper.png';
        this.sx = [40, 540, 1040, 1540, 2040];
        this.jx = [600, 1100, 1600];
        this.i = 0;
        this.dx = 0;
        this.walkInterval = null;
        this.jumpInterval = null;
    }

    walk() {
       this.walkInterval =  setInterval(() => {
            this.ctx.clearRect(this.dx, 200, 200, 200);
            this.ctx.drawImage(this.figure, this.sx[this.i % 5], 150, 500, 500, this.dx, 200, 200, 200);
            if(this.dx === 900) {
                clearInterval(this.walkInterval);
            }
            this.i += 1;
            this.dx += 5;
        }, 250)
    }

    jump() {
        this.jumpInterval = setInterval(() => {
            this.ctx.clearRect(this.dx, 200, 200, 200);
            this.ctx.drawImage(this.jumper, this.jx[this.i % 3], 850, 500, 500, this.dx, 185, 200, 200);
            if (this.dx === 900) {
                clearInterval(this.jumpInterval);
            }
            this.i += 1;
            this.dx += 5;
        }, 250)

    }
}

export default Walker;