import { Box } from "./boxs.js";
import { Bullet, Gun } from "./guns.js";
export class Player extends Box {
    speed;
    guns;
    gunIdx;
    constructor(level, x, y, color) {
        super(level, x, y, level.tileSize, level.tileSize, color);
        this.speed = level.tileSize / 4;
        this.level.canvas.parentElement?.addEventListener("keydown", (e) => this.keyDownListner(e));
        this.level.canvas.addEventListener("click", (e) => this.clickListner(e));
        this.guns = [
            new Gun(level, this.level.tileSize, this.level.tileSize, 10),
        ];
        this.gunIdx = 0;
        this.guns[0].textColor = "black";
    }
    checkCollisions() {
        for (let i = 0; i < this.level.layout.length; i++) {
            for (let j = 0; j < this.level.layout[i].length; j++) {
                if (this.level.layout[i][j] &&
                    this.checkCollision(this.level.layout[i][j])) {
                    if (this.level.layout[i][j] instanceof Gun) {
                        this.level.layout[i][j].x =
                            this.guns[this.guns.length - 1].x +
                                this.level.tileSize;
                        this.level.layout[i][j].y = this.guns[0].y;
                        this.guns.push(this.level.layout[i][j]);
                    }
                }
            }
        }
    }
    update() {
        if (this.dy == 0)
            this.dx -= Math.sign(this.dx) * 0.5;
        this.dy += 0.5;
        this.checkCollisions();
        this.x += this.dx;
        this.y += this.dy;
        if ((this.x > window.scrollX + 0.75 * window.innerWidth &&
            this.dx > 0) ||
            (this.x < window.scrollX + 0.25 * window.innerWidth && this.dx < 0)) {
            window.scrollBy(this.dx, 0);
        }
    }
    draw() {
        this.update();
        for (let idx = 0; idx < this.guns.length; idx++) {
            this.guns[idx].x += window.scrollX;
            this.guns[idx].draw();
            this.guns[idx].x -= window.scrollX;
        }
        super.draw();
    }
    keyDownListner(keyboardEvent) {
        switch (keyboardEvent.key) {
            case "w":
                if (this.dy == 0)
                    this.dy = -this.speed;
                break;
            case "a":
                this.dx = -this.speed;
                break;
            case "d":
                this.dx = this.speed;
                break;
            case "s":
                this.guns[this.gunIdx].textColor = this.guns[this.gunIdx].color;
                this.gunIdx = (this.gunIdx + 1) % this.guns.length;
                this.guns[this.gunIdx].textColor = "black";
                break;
            default:
                break;
        }
    }
    clickListner(clickEvent) {
        if (this.gunIdx < 0 || this.guns[this.gunIdx].coolDown > 0)
            return;
        this.level.boxs.push(new Bullet(this.guns[this.gunIdx], this, clickEvent.x + window.scrollX, clickEvent.y));
        if (this.guns[this.gunIdx].ammo == 0) {
            this.guns[this.gunIdx].color = "black";
            this.guns[this.gunIdx].textColor = "black";
            this.guns[this.gunIdx].draw();
            for (let idx = this.gunIdx + 1; idx < this.guns.length; idx++) {
                this.guns[idx].x -= this.level.tileSize;
            }
            this.guns.splice(this.gunIdx, 1);
            --this.gunIdx;
            if (this.gunIdx < 0 && this.guns.length > 0)
                this.gunIdx = 0;
            if (this.gunIdx >= 0)
                this.guns[this.gunIdx].textColor = "black";
        }
    }
}
