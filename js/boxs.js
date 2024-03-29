export class Box {
    level;
    x;
    y;
    width;
    height;
    color;
    dx;
    dy;
    textSize;
    textColor;
    constructor(level, x, y, width, height, color) {
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
    inRange(start1, len1, start2, len2) {
        return ((start2 <= start1 && start1 < start2 + len2) ||
            (start2 < start1 + len1 && start1 + len1 <= start2 + len2));
    }
    checkCollision(box) {
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
    draw(text = null) {
        this.level.context.fillStyle = this.color;
        this.level.context.fillRect(this.x, this.y, this.width, this.height);
        if (text) {
            this.level.context.fillStyle = this.textColor;
            this.level.context.font = this.textSize + "px Ariel";
            this.level.context.textAlign = "center";
            this.level.context.fillText(text, this.x + this.width / 2, this.y + this.height / 2);
        }
    }
}
