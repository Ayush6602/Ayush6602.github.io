import { Level } from "./levels";

export class Box {
  level: Level;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  dx: number;
  dy: number;
  textSize: number;
  textColor: string;

  constructor(
    level: Level,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.height = height;
    this.width = width;
    this.level = level;
    this.dx = 0;
    this.dy = 0;
    this.textSize = level.tileSize / 2;
    this.textColor = this.color;
  }

  inRange(start1: number, len1: number, start2: number, len2: number): boolean {
    return (
      (start2 <= start1 && start1 < start2 + len2) ||
      (start2 < start1 + len1 && start1 + len1 <= start2 + len2)
    );
  }

  checkCollision(box: Box): boolean {
    let collided = false;
    if (this.inRange(this.x + this.dx, this.width, box.x, box.width)) {
      if (this.inRange(this.y, this.height, box.y, box.height)) {
        if (box.color == "brown") {
          this.x = this.dx > 0 ? box.x - this.width : box.x + box.width;
          this.dx = 0;
        }
        collided = true;
      }
    }
    if (this.inRange(this.y + this.dy, this.height, box.y, box.height)) {
      if (this.inRange(this.x, this.width, box.x, box.width)) {
        if (box.color == "brown") {
          this.y = this.dy > 0 ? box.y - this.height : box.y + box.height;
          this.dy = 0;
        }
        collided = true;
      }
    }
    return collided;
  }

  draw(text: string | null = null): void {
    this.level.context.fillStyle = this.color;
    this.level.context.fillRect(this.x, this.y, this.width, this.height);
    if (text) {
      this.level.context.fillStyle = this.textColor;
      this.level.context.font = this.textSize + "px Ariel";
      this.level.context.textAlign = "center";
      this.level.context.fillText(
        text,
        this.x + this.width / 2,
        this.y + this.height / 2
      );
    }
  }
}
