import { Box } from "./boxs.js";

export class Level {
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D
	tileSize: number
	layout: Array<Array<Box>>

	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.context = context;
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
				this.layout[i][j] = new Box(
					this.canvas,
					this.context,
					j * this.tileSize,
					i * this.tileSize,
					this.tileSize,
					this.tileSize,
					rows[i][j] == "1" ? "brown" : "black"
				);
			}
		}
	}

	draw(): void {
		for (let i = 0; i < this.layout.length; i++) {
			for (let j = 0; j < this.layout[i].length; j++) {
				this.layout[i][j].draw();
			}
		}
	}
}
