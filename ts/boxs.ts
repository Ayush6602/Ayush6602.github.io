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
	}

	inRange(
		start1: number,
		len1: number,
		start2: number,
		len2: number
	): boolean {
		return (
			(start2 <= start1 && start1 < start2 + len2) ||
			(start2 < start1 + len1 && start1 + len1 <= start2 + len2)
		);
	}

	checkCollision(box: Box): boolean {
		let collided = false;
		if (this.inRange(this.x + this.dx, this.width, box.x, box.width)) {
			if (this.inRange(this.y, this.height, box.y, box.height)) {
				if (box.color == "brown") this.dx = 0;
				collided = true;
			}
		}
		if (this.inRange(this.y + this.dy, this.height, box.y, box.height)) {
			if (this.inRange(this.x, this.width, box.x, box.width)) {
				if (box.color == "brown") this.dy = 0;
				collided = true;
			}
		}
		return collided;
	}

	draw(): void {
		this.level.context.fillStyle = this.color;
		this.level.context.fillRect(this.x, this.y, this.width, this.height);
	}
}
