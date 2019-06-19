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

export default Sound;