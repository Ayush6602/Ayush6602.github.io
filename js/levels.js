import { Box } from "./boxs.js";

export class Level {
	constructor(canvas, context) {
		this.canvas = canvas;
		this.context = context;
	}

	async loadLevel(levelNo) {
		let res = await fetch("/levels/level" + levelNo + ".txt");
		res = await res.text();
		res = res.split("\n");
		this.tileSize = this.canvas.height / res.length;
		this.layout = Array(res.length);
		for (let i = 0; i < res.length; i++) {
			this.layout[i] = Array(res[i].length);
			for (let j = 0; j < res[i].length; j++) {
				this.layout[i][j] = new Box(
					this.canvas,
					this.context,
					j * this.tileSize,
					i * this.tileSize,
					this.tileSize,
					this.tileSize,
					res[i][j] == 1 ? "brown" : "black"
				);
			}
		}
	}

	draw() {
		for (let i = 0; i < this.layout.length; i++) {
			for (let j = 0; j < this.layout[i].length; j++) {
				this.layout[i][j].draw();
			}
		}
	}
}
