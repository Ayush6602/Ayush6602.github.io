import { Level } from "./levels.js";
const FPS = 30;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
if (context == null)
    throw new Error("Could not get context");
const level = new Level(canvas, context);
await level.loadLevel(1);
setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    level.draw();
}, 1000 / FPS);
