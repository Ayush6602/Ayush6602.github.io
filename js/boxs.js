export class Box {
    level;
    x;
    y;
    width;
    height;
    color;
    dx;
    dy;
    constructor(level, x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.height = height;
        this.width = width;
        this.level = level;
        this.dx = 0;
        this.dy = 0;
    }
    inRange(start1, len1, start2, len2) {
        return ((start2 <= start1 && start1 < start2 + len2) ||
            (start2 < start1 + len1 && start1 + len1 <= start2 + len2));
    }
    checkCollision(box) {
        let collided = false;
        if (this.inRange(this.x + this.dx, this.width, box.x, box.width)) {
            if (this.inRange(this.y, this.height, box.y, box.height)) {
                if (box.color == "brown")
                    this.dx = 0;
                collided = true;
            }
        }
        if (this.inRange(this.y + this.dy, this.height, box.y, box.height)) {
            if (this.inRange(this.x, this.width, box.x, box.width)) {
                if (box.color == "brown")
                    this.dy = 0;
                collided = true;
            }
        }
        return collided;
    }
    draw() {
        this.level.context.fillStyle = this.color;
        this.level.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
