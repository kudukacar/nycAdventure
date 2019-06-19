import Game from './game';


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
            const game = new Game(ctx, document, canvas, time1, intervalTime1);
            game.play();
            canvas.style.animationPlayState = 'running';
        } 
    }) 
    level2.addEventListener('click', (e) => {
        if (replay === false) {
            e.preventDefault();
            replay = true;
            ctx.clearRect(0, 0, 1200, 400);
            const game = new Game(ctx, document, canvas, time2, intervalTime2);
            game.play();
            canvas.style.animationPlayState = 'running';
        }
    }) 
    level3.addEventListener('click', (e) => {
        if (replay === false) {
            e.preventDefault();
            replay = true;
            ctx.clearRect(0, 0, 1200, 400);
            const game = new Game(ctx, document, canvas, time3, intervalTime3);
            game.play();
            canvas.style.animationPlayState = 'running';
        }
    }) 
})
