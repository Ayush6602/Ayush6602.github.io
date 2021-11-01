import { Box } from "./boxs.js";
import { Level } from "./levels.js";
import { Player } from "./players.js";

export class Gun extends Box {
	recoil: number;
	spread: number;
	ammo: number;
	speed: number;
	reloadTime: number;
	coolDown: number;

	constructor(level: Level, x: number, y: number, weight: number) {
		super(
			level,
			x,
			y,
			level.tileSize,
			level.tileSize,
			`rgb(255, ${Math.round(255 - (weight * 255) / 100)}, 0)`
		);
		this.recoil = weight / 3;
		this.spread = 5 - Math.round(weight / 20);
		this.ammo = 25 - Math.round(weight / 5);
		this.reloadTime = weight * 2;
		this.coolDown = 0;
		this.speed = 10 + Math.round(weight / 4);
	}

	draw() {
		if (this.coolDown >= this.reloadTime) this.coolDown = 0;
		else if (this.coolDown > 0) this.coolDown++;
		super.draw(this.ammo.toString());
	}
}

export class Bullet extends Box {
	constructor(gun: Gun, player: Player, x: number, y: number) {
		super(
			gun.level,
			player.x + player.width / 2,
			player.y + player.height / 2,
			gun.level.tileSize / 10,
			gun.level.tileSize / 10,
			gun.color
		);
		let cos =
			(x - this.x) /
			Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
		let sin =
			(y - this.y) /
			Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
		this.dx = gun.speed * cos + (Math.random() - 0.5) * gun.spread;
		this.dy = gun.speed * sin + (Math.random() - 0.5) * gun.spread;
		player.dx += -gun.recoil * cos;
		player.dy += -gun.recoil * sin;
		if (gun.ammo > 0) gun.ammo--;
		gun.coolDown += 1;
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
