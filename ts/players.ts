import { Box } from "./boxs.js";
import { Bullet, Gun } from "./guns.js";
import { Level } from "./levels.js";

export class Player extends Box {
	speed: number;
	inAir: boolean;
	guns: Array<Gun>;
	gunIdx: number;

	constructor(level: Level, x: number, y: number, color: string) {
		super(level, x, y, level.tileSize, level.tileSize, color);
		this.speed = level.tileSize / 4;
		this.inAir = false;
		this.level.canvas.parentElement?.addEventListener("keydown", (e) =>
			this.keyDownListner(e)
		);
		this.level.canvas.addEventListener("click", (e) =>
			this.clickListner(e)
		);
		this.guns = [];
		this.gunIdx = 0;
	}

	update(): void {
		if (this.inAir) this.dy += 0.5;
		const row = Math.floor(this.y / this.level.tileSize);
		const col = Math.floor(this.x / this.level.tileSize);
		if (this.dy >= 0 && this.level.layout[row + 1][col]?.color == "brown") {
			this.inAir = false;
			this.dy = 0;
		} else {
			this.inAir = true;
		}
		this.dx = Math.min(this.dx, this.speed);
		this.dx = Math.max(this.dx, -this.speed);
		this.dy = Math.min(this.dy, this.speed);
		this.dy = Math.max(this.dy, -this.speed);
		for (let i = 0; i < this.level.layout.length; i++) {
			for (let j = 0; j < this.level.layout[i].length; j++) {
				if (!this.level.layout[i][j]) continue;
				if (this.checkCollision(this.level.layout[i][j])) {
					if (this.level.layout[i][j].color == "yellow") {
						this.guns.push(<Gun>this.level.layout[i][j]);
						delete this.level.layout[i][j];
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

	keyDownListner(keyboardEvent: KeyboardEvent): void {
		switch (keyboardEvent.key) {
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

	clickListner(clickEvent: MouseEvent): void {
		if (this.guns.length == 0) return;
		this.level.boxs.push(
			new Bullet(this.level, this, clickEvent.x, clickEvent.y)
		);
	}
}
