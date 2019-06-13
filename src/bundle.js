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


class Game {
    constructor(ctx, document) {
        this.ctx = ctx;
        this.document = document;
        this.x = 1200;
        this.dx = 2;
        this.movePoopInterval;
        this.setPoopTimeout;
        this.walker = new _walker__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx);
        this.gameOver = false;
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
        this.movePoopInterval = setInterval(() => {
            this.ctx.clearRect(this.x - 80, 350, 90, 90);
            this.drawPoop();
            if(this.x === 0) {
                this.x = 1200;
            }
            const collision = this.walker.xPosition() >= this.xPositionEnd() && this.walker.xPosition() <= this.x;
            if (this.walker.yPosition() >= this.yPositionStart() && collision) {
                this.gameOver = true;
            } 
            if(this.gameOver === true) {
                clearInterval(this.movePoopInterval);
                this.walker.collision();
                alert('Find a patch of grass to clean your shoes')
            }
            if(this.walker.xPosition() >= 1100) {
                clearInterval(this.movePoopInterval);
            }
            this.x -= this.dx;
        }, 10)
    }

    xPositionEnd() {
        return this.x - 60;
    }

    yPositionStart() {
       return 385
    }

    play() {
        this.movePoop();
        this.walker.walk();
        return document.addEventListener('keypress', (e) => {
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
    let replay = false;
    return document.addEventListener('keypress', (e) => {
        e.preventDefault();
        if (e.keyCode === 13 && replay === false) {
            replay = true;
            ctx.clearRect(0, 0, 1200, 400);
            const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, document);
            game.play();
        } else if(e.keyCode === 13 && replay === true) {
            document.location.reload();
        }
    })
})


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
    constructor(ctx) {
        this.ctx = ctx;
        this.figure = new Image();
        this.figure.src = 'images/walker4.png';
        this.jumper = new Image();
        this.jumper.src = 'images/jumper.png';
        this.sx = [540, 1040, 1540];
        this.jx = [600, 1100, 1600];
        this.i = 0;
        this.j = 0;
        this.dx = 0;
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
                alert('You made it to work spot free!')
            }
            this.i += 1;
            this.dx += 5;
        }, 125)
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

/* harmony default export */ __webpack_exports__["default"] = (Walker);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map