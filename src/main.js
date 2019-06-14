import Game from './game';


document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.style.animationPlayState='paused';
    let replay = false;
    return document.addEventListener('keypress', (e) => {
        e.preventDefault();
        if (e.keyCode === 13 && replay === false) {
            replay = true;
            ctx.clearRect(0, 0, 1200, 400);
            const game = new Game(ctx, document, canvas);
            game.play();
            canvas.style.animationPlayState='running';
        } else if(e.keyCode === 13 && replay === true) {
            document.location.reload();
        }
    })
})
