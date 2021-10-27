export class Box {
	canvas: HTMLCanvasElement
	context: CanvasRenderingContext2D
	x: number
	y: number
	width: number
	height: number
	color: string

	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.height = height;
		this.width = width;
		this.canvas = canvas;
		this.context = context;
	}

	draw(): void {
		this.context.fillStyle = this.color;
		this.context.fillRect(this.x, this.y, this.width, this.height);
	}
}
