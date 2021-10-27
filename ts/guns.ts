import { Box } from "./boxs.js";
import { Level } from "./levels.js";
import { Player } from "./players.js";

export class Gun extends Box {
	recoil: number;
	spread: number;
	ammo: number;

	constructor(
		level: Level,
		x: number,
		y: number,
		color: string,
		recoil: number,
		spread: number,
		ammo: number
	) {
		super(level, x, y, level.tileSize, level.tileSize, color);
		this.recoil = recoil;
		this.spread = spread;
		this.ammo = ammo;
	}
}

export class Bullet extends Box {
	constructor(level: Level, player: Player, x: number, y: number) {
		super(
			level,
			player.x + player.width / 2,
			player.y + player.height / 2,
			level.tileSize / 5,
			level.tileSize / 10,
			"yellow"
		);
		this.dx =
			(player.speed * (x - this.x)) /
			Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
		this.dy =
			(player.speed * (y - this.y)) /
			Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
	}
	update(): void {
		for (let i = 0; i < this.level.layout.length; i++) {
			for (let j = 0; j < this.level.layout[i].length; j++) {
				if (!this.level.layout[i][j]) continue;
				if (this.checkCollision(this.level.layout[i][j])) {
					if (this.level.layout[i][j].color == "brown") {
						this.level.boxs.splice(
							this.level.boxs.indexOf(this),
							1
						);
					}
				}
			}
		}
		this.x += this.dx;
		this.y += this.dy;
	}
	draw(): void {
		this.update();
		super.draw();
	}
}
