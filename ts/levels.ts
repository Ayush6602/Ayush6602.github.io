import { Box } from "./boxs.js";
import { Gun } from "./guns.js";
import { Player } from "./players.js";

export class Level {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	tileSize: number;
	layout: Array<Array<Box>>;
	boxs: Array<Box>;

	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.context = context;
		this.layout = [];
		this.boxs = [];
		this.tileSize = 40;
	}

	async loadLevel(levelNo: number): Promise<void> {
		let res = await fetch("/levels/level" + levelNo + ".txt");
		let resTxt = await res.text();
		let rows = resTxt.split("\n");
		this.tileSize = this.canvas.height / rows.length;
		this.layout = Array(rows.length);
		for (let i = 0; i < rows.length; i++) {
			this.layout[i] = Array(rows[i].length);
			for (let j = 0; j < rows[i].length; j++) {
				if (rows[i][j] == "P") {
					this.boxs.push(
						new Player(
							this,
							j * this.tileSize,
							i * this.tileSize,
							"green"
						)
					);
				} else if (rows[i][j] == "G") {
					const weight = Math.round(20 + Math.random() * 80);
					this.layout[i][j] = new Gun(
						this,
						j * this.tileSize,
						i * this.tileSize,
						weight
					);
				} else if (rows[i][j] == "1") {
					this.layout[i][j] = new Box(
						this,
						j * this.tileSize,
						i * this.tileSize,
						this.tileSize,
						this.tileSize,
						"brown"
					);
				}
			}
		}
	}

	draw(): void {
		for (let i = 0; i < this.boxs.length; i++) {
			this.boxs[i].draw();
		}
		for (let i = 0; i < this.layout.length; i++) {
			for (let j = 0; j < this.layout[i].length; j++) {
				if (!(this.layout[i][j] instanceof Box)) continue;
				this.layout[i][j].draw();
			}
		}
	}
}
