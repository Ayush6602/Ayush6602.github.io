import { Box } from "./boxs";

export class Gun extends Box {
	constructor(canvas, context, player, color) {
		super(
			canvas,
			context,
			player.x,
			player.y,
			level.tileSize,
			level.tileSize,
			color
		);
	}
}
