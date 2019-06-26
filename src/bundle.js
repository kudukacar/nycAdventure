/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _walker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./walker */ "./src/walker.js");
/* harmony import */ var _sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sound */ "./src/sound.js");



class Game {
    constructor(ctx, document, canvas, time, intervalTime) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.document = document;
        this.time = time;
        this.x = [400, 800, 1200];
        this.dx = 2;
        this.intervalTime = intervalTime;
        this.poopIntervals = [this.movePoopInterval0, this.movePoopInterval1, this.movePoopInterval2];
        this.checkGameOverInterval;
        this.walker = new _walker__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, this.document, this.time);
        this.poopSound = new _sound__WEBPACK_IMPORTED_MODULE_1__["default"]("sounds/sound2.mp4", this.document);
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
            this.ctx.clearRect(this.x[i] - 60, 350, 65, 65);
            this.drawPoop(i);
            if (this.x[i] === 0) {
                this.x[i] = 1200;
            }
            const collision = this.walker.xPosition() >= this.xPositionEnd(i) && this.walker.xPosition() <= this.x[i];
            if (this.walker.yPosition() >= this.yPositionStart() && collision) {
                this.poopSound.play();
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
                this.ctx.fillText("Find a patch of grass to clean your shoes!", canvas.width / 2, canvas.height / 3);
                setTimeout(() => {
                    this.document.location.reload();
                }, 2500)
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

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");



document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const level1 = document.getElementById("level1");
    const time1 = 200;
    const intervalTime1 = [20, 20, 20];
    const level2 = document.getElementById("level2");
    const time2 = 150;
    const intervalTime2 = [15, 15, 15];
    const level3 = document.getElementById("level3");
    const time3 = 100;
    const intervalTime3 = [10, 10, 10];
    canvas.style.animationPlayState='paused';
    let replay = false;
    level1.addEventListener('click', (e) => {
        if (replay === false) {
            e.preventDefault();
            replay = true;
            ctx.clearRect(0, 0, 1200, 400);
            const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, document, canvas, time1, intervalTime1);
            game.play();
            canvas.style.animationPlayState = 'running';
        } 
    }) 
    level2.addEventListener('click', (e) => {
        if (replay === false) {
            e.preventDefault();
            replay = true;
            ctx.clearRect(0, 0, 1200, 400);
            const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, document, canvas, time2, intervalTime2);
            game.play();
            canvas.style.animationPlayState = 'running';
        }
    }) 
    level3.addEventListener('click', (e) => {
        if (replay === false) {
            e.preventDefault();
            replay = true;
            ctx.clearRect(0, 0, 1200, 400);
            const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, document, canvas, time3, intervalTime3);
            game.play();
            canvas.style.animationPlayState = 'running';
        }
    }) 
})


/***/ }),

/***/ "./src/sound.js":
/*!**********************!*\
  !*** ./src/sound.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Sound {
    constructor(src, document) {
        this.document = document;
        this.sound = this.document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        this.document.body.appendChild(this.sound);
    }

    play() {
        this.sound.play();
    }
    
    stop() {
        this.sound.pause();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Sound);

/***/ }),

/***/ "./src/walker.js":
/*!***********************!*\
  !*** ./src/walker.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Walker);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map