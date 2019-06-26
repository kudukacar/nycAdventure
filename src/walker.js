class Walker {
    constructor(ctx, document, time) {
        this.ctx = ctx;
        this.document = document;
        this.time = time;
        this.figure = new Image();
        this.figure.src = 'images/walker4.png';
        this.jumper = new Image();
        this.jumper.src = 'images/jumper.png';
        this.sx = [540, 1040, 1540];
        this.jx = [600, 1100, 1600];
        this.dy = [200, 160, 160];
        this.i = 0;
        this.j = 0;
        this.dx = -100;
        this.jumping = false;
        this.walkInterval;
        this.jumpInterval;
        this.gameOver = false;
    }

    walk() {
        this.jumping = false;
        this.walkInterval = setInterval(() => {
            this.ctx.clearRect(this.dx, 160, 200, 240);
            this.ctx.drawImage(this.figure, this.sx[this.i % 3], 150, 500, 500, this.dx, 200, 200, 200);

            if(this.dx >= 900) {
                this.collision();
                setTimeout(() => {
                    this.document.location.reload();
                }, 2500)
                this.ctx.font = "34px sans-serif";
                this.ctx.fillStyle = "white";
                this.ctx.textAlign = "center";
                this.ctx.fillText("You made it home spot free!", canvas.width / 2, canvas.height / 2); 
            }
 
            this.i += 1;
            this.dx += 5;
        }, this.time)
    }

    jump() {
        if(this.gameOver === false) {
            clearInterval(this.walkInterval);
            // this.ctx.clearRect(this.dx, 200, 200, 200);
            this.jumping = true;
            this.jumpInterval = setInterval(() => {
                this.ctx.clearRect(this.dx, this.dy[this.j % 3], 200, 200);
                this.ctx.drawImage(this.jumper, this.jx[this.j % 3], 850, 500, 500, this.dx, 160, 200, 200);
                this.j += 1;
                this.dx += 35;
        if(this.j === 3  && this.gameOver === false) {
            clearInterval(this.jumpInterval);
            // this.ctx.clearRect(this.dx, 160, 200, 200);
            this.j = 0;
            this.dx -= 35;
            this.walk();
        }
            
            }, this.time)
        }

    }


    collision() {
        this.gameOver = true;
        clearInterval(this.walkInterval);
        clearInterval(this.jumpInterval);
    }

    xPosition() {
        return this.dx + 200;
    }

    yPosition() {
        if(this.jumping === true) {
            return 360
        } else {
            return 400
        }
    }

}

export default Walker;