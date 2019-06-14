class Walker {
    constructor(ctx) {
        this.ctx = ctx;
        this.figure = new Image();
        this.figure.src = 'images/walker4.png';
        this.jumper = new Image();
        this.jumper.src = 'images/jumper.png';
        this.sx = [540, 1040, 1540];
        this.i = 0;
        this.dx = -100;
        this.jumping = false;
        this.walkInterval;
        this.gameOver = false;
    }

    walk() {
        this.jumping = false;
        this.walkInterval = setInterval(() => {
            this.ctx.clearRect(this.dx, 200, 200, 200);
            this.ctx.drawImage(this.figure, this.sx[this.i % 3], 150, 500, 500, this.dx, 200, 200, 200);

            if(this.dx >= 900) {
            clearInterval(this.walkInterval);
                this.ctx.clearRect(this.dx, 200, 200, 200);
                this.ctx.drawImage(this.figure, 40, 150, 500, 500, this.dx, 200, 200, 200);
                this.ctx.font = "34px sans-serif";
                this.ctx.fillStyle = "white";
                this.ctx.textAlign = "center";
                this.ctx.fillText("You made it home spot free!", canvas.width / 2, canvas.height / 2); 
            }
 
            this.i += 1;
            this.dx += 5;
        }, 150)
    }


    jump() {
        clearInterval(this.walkInterval);
        this.jumping = true;
        this.ctx.clearRect(this.dx, 200, 200, 200);
        this.ctx.drawImage(this.jumper, 1100, 850, 500, 500, this.dx, 200, 200, 180);
        this.dx += 85;
        if(this.gameOver === false) {
            setTimeout(this.walk(), 1000);
        }
    }

    collision() {
        this.gameOver = true;
        clearInterval(this.walkInterval);
        this.ctx.clearRect(this.dx, 200, 200, 200);
        this.ctx.drawImage(this.figure, 40, 150, 500, 500, this.dx, 200, 200, 200);
    }

    xPosition() {
        return this.dx + 200;
    }

    yPosition() {
        if(this.jumping === true) {
            return 380
        } else {
            return 400
        }
    }

}

export default Walker;