import { Box } from "./boxs.js";
import { Bullet, Gun } from "./guns.js";
import { Level } from "./levels.js";

export class Player extends Box {
  speed: number;
  guns: Array<Gun>;
  gunIdx: number;

  constructor(level: Level, x: number, y: number, color: string) {
    super(level, x, y, level.tileSize, level.tileSize, color);
    this.speed = level.tileSize / 4;
    this.level.canvas.parentElement?.addEventListener("keydown", (e) =>
      this.keyDownListner(e)
    );
    this.level.canvas.addEventListener("click", (e) => this.clickListner(e));
    this.guns = [new Gun(level, this.level.tileSize, this.level.tileSize, 10)];
    this.gunIdx = 0;
    this.guns[0].textColor = "black";
  }

  checkCollisions(): void {
    for (let i = 0; i < this.level.layout.length; i++) {
      for (let j = 0; j < this.level.layout[i].length; j++) {
        if (
          this.level.layout[i][j] &&
          this.checkCollision(this.level.layout[i][j])
        ) {
          if (
            this.level.layout[i][j] instanceof Gun &&
            !this.guns.includes(<Gun>this.level.layout[i][j])
          ) {
            this.guns.push(<Gun>this.level.layout[i][j]);
            if (this.gunIdx < 0) {
              this.gunIdx = 0;
              this.guns[this.gunIdx].textColor = "black";
            }
          }
        }
      }
    }
  }

  update(): void {
    if (this.dy == 0) this.dx -= Math.sign(this.dx) * 0.5;
    this.dy += 0.5;
    this.checkCollisions();
    this.x += this.dx;
    this.y += this.dy;
    if (
      (this.x > window.scrollX + 0.75 * window.innerWidth && this.dx > 0) ||
      (this.x < window.scrollX + 0.25 * window.innerWidth && this.dx < 0)
    ) {
      window.scrollBy(this.dx, 0);
    }
  }

  draw() {
    this.update();
    for (let idx = 0; idx < this.guns.length; idx++) {
      this.guns[idx].x = (idx + 1) * this.level.tileSize + window.scrollX;
      this.guns[idx].y = this.level.tileSize;
      this.guns[idx].draw();
    }
    super.draw();
  }

  keyDownListner(keyboardEvent: KeyboardEvent): void {
    switch (keyboardEvent.key) {
      case "w":
        if (this.dy == 0) this.dy = -this.speed;
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

  clickListner(clickEvent: MouseEvent): void {
    if (this.gunIdx < 0 || this.guns[this.gunIdx].coolDown > 0) return;
    this.guns[this.gunIdx].audio.play();
    this.level.boxs.push(
      new Bullet(
        this.guns[this.gunIdx],
        this,
        clickEvent.x + window.scrollX,
        clickEvent.y
      )
    );
    if (this.guns[this.gunIdx].ammo == 0) {
      this.guns[this.gunIdx].color = "black";
      this.guns[this.gunIdx].textColor = "black";
      this.guns[this.gunIdx].draw();
      for (let idx = this.gunIdx + 1; idx < this.guns.length; idx++) {
        this.guns[idx].x -= this.level.tileSize;
      }
      this.guns.splice(this.gunIdx, 1);
      --this.gunIdx;
      if (this.gunIdx < 0 && this.guns.length > 0) this.gunIdx = 0;
      if (this.gunIdx >= 0) this.guns[this.gunIdx].textColor = "black";
    }
  }
}
