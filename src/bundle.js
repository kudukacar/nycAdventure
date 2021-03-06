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
/* harmony import */ var _poop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./poop */ "./src/poop.js");




class Game {
    constructor(ctx, document, canvas, time) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.document = document;
        this.time = time;
        this.poop1 = new _poop__WEBPACK_IMPORTED_MODULE_2__["default"](400, this.ctx);
        this.poop2 = new _poop__WEBPACK_IMPORTED_MODULE_2__["default"](800, this.ctx);
        this.poop3 = new _poop__WEBPACK_IMPORTED_MODULE_2__["default"](1200, this.ctx);
        this.checkGameOverInterval;
        this.walker = new _walker__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, this.document, this.time);
        this.poopSound = new _sound__WEBPACK_IMPORTED_MODULE_1__["default"]("sounds/sound2.mp4", this.document);
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
            if (this.walker.dx >= 900) {
                this.poop1.collision();
                this.poop2.collision();
                this.poop3.collision();
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
    const level2 = document.getElementById("level2");
    const time2 = 150;
    const level3 = document.getElementById("level3");
    const time3 = 100;
    canvas.style.animationPlayState='paused';
    let replay = false;
    const playGame = (time, e) => {
        if(replay === false) {
            e.preventDefault();
            replay = true;
            ctx.clearRect(0, 0, 1200, 400);
            const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, document, canvas, time);
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
})


/***/ }),

/***/ "./src/poop.js":
/*!*********************!*\
  !*** ./src/poop.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Poop);

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
        this.dy = [300, 200, 200];
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
            this.ctx.clearRect(this.dx, 100, 200, 300);
            this.ctx.drawImage(this.figure, this.sx[this.i % 3], 150, 500, 500, this.dx, 200, 200, 200);

            if(this.dx >= 925 && this.gameOver === false) {
                this.collision();
                setTimeout(() => {
                    this.document.location.reload();
                }, 2500)
                this.ctx.font = "34px sans-serif";
                this.ctx.fillStyle = "black";
                this.ctx.textAlign = "center";
                this.ctx.fillText("You made it home spot free!", canvas.width / 2, canvas.height / 2);
                this.canvas.style.animationPlayState = 'paused';
            }
 
            this.i += 1;
            this.dx += 5;
        }, this.time)
    }

    jump() {
        if(this.gameOver === false) {
            clearInterval(this.walkInterval);
            this.jumping = true;
            this.jumpInterval = setInterval(() => {
                this.ctx.clearRect(this.dx, 100, 200, this.dy[this.j % 3]);
                this.ctx.drawImage(this.jumper, this.jx[this.j % 3], 850, 500, 500, this.dx, 100, 200, 200);

                if (this.dx >= 925 && this.gameOver === false) {
                    this.collision();
                    setTimeout(() => {
                        this.document.location.reload();
                    }, 2500)
                    this.ctx.font = "34px sans-serif";
                    this.ctx.fillStyle = "black";
                    this.ctx.textAlign = "center";
                    this.ctx.fillText("You made it home spot free!", canvas.width / 2, canvas.height / 2);
                    this.canvas.style.animationPlayState = 'paused';
                }

                this.j += 1;
                this.dx += 45;
                if(this.j >= 3  && this.gameOver === false) {
                    clearInterval(this.jumpInterval);
                    this.jumping = false;
                    this.j = 0;
                    this.dx -= 45;
                    this.walk();
                }
            }, this.time * .25)
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
            return 340
        } else {
            return 400
        }
    }

}

/* harmony default export */ __webpack_exports__["default"] = (Walker);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map