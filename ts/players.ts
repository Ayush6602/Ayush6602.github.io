import { Box } from "./boxs.js";
import { Level } from "./levels.js";

export class Player extends Box {
	speed: number
	inAir: boolean
	level: Level
	x: number
	y: number
	color: string
	dx: number
	dy: number

	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, level: Level, x: number, y: number, color: string) {
		super(canvas, context, x, y, level.tileSize, level.tileSize, color);
		this.speed = level.tileSize / 4;
		this.inAir = false;
		this.level = level;
		this.dx = 0;
		this.dy = 0;
	}

	inRange(start1: number, len1: number, start2: number, len2: number): boolean {
		return (
			(start2 <= start1 && start1 < start2 + len2) ||
			(start2 < start1 + len1 && start1 + len1 <= start2 + len2)
		);
	}

	checkCollision(box: Box): void {
		if (this.inRange(this.x + this.dx, this.width, box.x, box.width)) {
			if (this.inRange(this.y, this.height, box.y, box.height)) {
				this.dx = 0;
			}
		}
		if (this.inRange(this.y + this.dy, this.height, box.y, box.height)) {
			if (this.inRange(this.x, this.width, box.x, box.width)) {
				this.dy = 0;
			}
		}
	}

	update(): void {
		if (this.inAir) this.dy += 0.5;
		const row = Math.floor(this.y / this.level.tileSize);
		const col = Math.floor(this.x / this.level.tileSize);
		if (this.dy >= 0) {
			if (this.level.layout[row + 1][col].color != "black") {
				this.inAir = false;
				this.dy = 0;
			} else {
				this.inAir = true;
			}
		} else {
			this.inAir = true;
		}
		this.dx = Math.min(this.dx, this.speed);
		this.dx = Math.max(this.dx, -this.speed);
		this.dy = Math.min(this.dy, this.speed);
		this.dy = Math.max(this.dy, -this.speed);
		for (let i = 0; i < this.level.layout.length; i++) {
			for (let j = 0; j < this.level.layout[i].length; j++) {
				if (this.level.layout[i][j].color == "black") continue;
				this.checkCollision(this.level.layout[i][j]);
			}
		}
		this.x += this.dx;
		this.y += this.dy;
	}

	keyDownListner(key: string): void {
		switch (key) {
			case "w":
				if (!this.inAir) {
					this.dy = -this.speed;
				}
				break;
			case "a":
				this.dx -= 3;
				break;
			case "d":
				this.dx += 3;
				break;
			case "s":
				this.dx = 0;
				break;
			default:
				break;
		}
	}
}
