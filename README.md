# README

# nycAdventure 
    A spoof of a New York City sidewalk, riddled with dog poop, and a walker, eager to get home, jumping to avoid the mess.
![image](https://user-images.githubusercontent.com/41526816/62483074-d34b3c00-b784-11e9-9fc8-89873f593e7f.png)
    
# Site
[Live](https://kudukacar.github.io/nycAdventure/)

# Technologies
* JavaScript
* HTML5 Canvas
* CSS3
* Webpack

# Features 
### Collision detection
The game ends when the walker steps on poop
#### Code Snippet
```javascript
    const collision1 = this.walker.xPosition() >= this.poop1.xPositionEnd() && this.walker.xPosition() <= this.poop1.x;
    const collision2 = this.walker.xPosition() >= this.poop2.xPositionEnd() && this.walker.xPosition() <= this.poop2.x;
    const collision3 = this.walker.xPosition() >= this.poop3.xPositionEnd() && this.walker.xPosition() <= this.poop3.x;
    
    if (this.walker.yPosition() >= this.poop1.yPositionStart() && (collision1 || collision2 || collision3)) {
        this.poopSound.play();
        this.gameOver = true;
    }

```

### Event listener
The walker jumps when the player presses the spacebar only if the walker is not already jumping
#### Code Snippet
```javascript
    return this.document.addEventListener('keypress', (e) => {
        e.preventDefault();
        if (e.keyCode === 32 && this.walker.jumping === false) {
            return this.walker.jump();
        }
    })
``` 

### Animate poop
RequestAnimationFrame to move poop across the board
#### Code Snippet
```javascript
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            this.poopInterval = window.setInterval(callback, 10);
        }
    })();
    window.cancelAnimFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearInterval(this.poopInterval);

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
```

### Three levels of play
The walker moves at a faster speed in each advancing level
#### Code Snippet
```javascript
    const level1 = document.getElementById("level1");
    const time1 = 200;
    const level2 = document.getElementById("level2");
    const time2 = 150;
    const level3 = document.getElementById("level3");
    const time3 = 100;
    
    const playGame = (time, e) => {
        if(replay === false) {
            e.preventDefault();
            replay = true;
            ctx.clearRect(0, 0, 1200, 400);
            const game = new Game(ctx, document, canvas, time);
            game.play();
            canvas.style.animationPlayState = 'running';
        }
    }
    level1.addEventListener('click', (e) => {
        playGame(time1, e); 
    }) 
    level2.addEventListener('click', (e) => {
        playGame(time2, e);
    }) 
    level3.addEventListener('click', (e) => {
        playGame(time3, e);
    }) 
```