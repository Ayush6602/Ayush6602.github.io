import { Box } from "./boxs.js";
export class Gun extends Box {
    recoil;
    spread;
    ammo;
    constructor(level, x, y, color, recoil, spread, ammo) {
        super(level, x, y, level.tileSize, level.tileSize, color);
        this.recoil = recoil;
        this.spread = spread;
        this.ammo = ammo;
    }
}
export class Bullet extends Box {
    constructor(level, player, x, y) {
        super(level, player.x + player.width / 2, player.y + player.height / 2, level.tileSize / 5, level.tileSize / 10, "yellow");
        this.dx =
            (player.speed * (x - this.x)) /
                Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
        this.dy =
            (player.speed * (y - this.y)) /
                Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
    }
    update() {
        for (let i = 0; i < this.level.layout.length; i++) {
            for (let j = 0; j < this.level.layout[i].length; j++) {
                if (!this.level.layout[i][j])
                    continue;
                if (this.checkCollision(this.level.layout[i][j])) {
                    if (this.level.layout[i][j].color == "brown") {
                        this.level.boxs.splice(this.level.boxs.indexOf(this), 1);
                    }
                }
            }
        }
        this.x += this.dx;
        this.y += this.dy;
    }
    draw() {
        this.update();
        super.draw();
    }
}
