import { Player } from "./players.js";
import { Level } from "./levels.js";
const FPS = 30;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const level = new Level(canvas, context);
await level.loadLevel(1);
const player = new Player(canvas, context, level, level.tileSize, level.tileSize * (level.layout.length - 2), "green");
document.body.addEventListener("keydown", (event) => {
    player.keyDownListner(event.key);
});
setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    level.draw();
    player.update();
    player.draw();
}, 1000 / FPS);
