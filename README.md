# README

# nycAdventure 
    A spoof of a New York City sidewalk, riddled with dog poop, and a walker, eager to get home, jumping to avoid the mess.
![image](https://user-images.githubusercontent.com/41526816/59969836-b553b000-9525-11e9-8152-c2d052e83f2c.png)
    
# Site
[Live](https://kudukacar.github.io/nycAdventure/)

# Technologies
   * Webpack
   * JavaScript
   * HTML5 Canvas
   * CSS3

# Features 
   * Developed a collision detection algorithm for sprite characters, and a canvas shape (the dog poop) to assess game        status. 
   * Integrated sprite character movement with event listeners, translating user input into graphical representations.  


# Code Snippets

## Managing asynchronous and synchronous functions
Syncronous functions execute in the order they're listed, such that a subsequent synchronous function waits for the previous synchronous function to execute.  On the other hand, asynchronous functions do not block other subsequent functions from executing.  If you have both synchronous and asynchronous functions, the synchronous functions execute first.  As such, to execute asynchronous functions first, we place synchronous functions within the callback of an asynchronous function.        

```javascript
        // this.jumping executes first
        this.jumping = false;
        // Then, setInterval, an asynchronous function executes, and the synchronous functions (clearRect, drawImage, etc.) within the callback of setInterval executes.
        this.walkInterval = setInterval(() => {
            this.ctx.clearRect(this.dx, 160, 200, 240);
            this.ctx.drawImage(this.figure, this.sx[this.i % 3], 150, 500, 500, this.dx, 200, 200, 200);
        // In the code below, setTimeout(), an asynchronous function, executes after the code listed below it.
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

```
