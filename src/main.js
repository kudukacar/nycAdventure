
const background = new Image();
background.src = "https://backgroundcheckall.com/wp-content/uploads/2017/12/city-background-cartoon-5.jpg";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    background.onload = () => { ctx.drawImage(background, 0, 0, 1200, 400)};
})
