// tile.js
// Contains code describing individual tiles
function Tile() {
	this.isMine = false;
	this.neighbors = 0;
	this.revealed = false;
	this.flagged = false;

	this.draw = draw;
	this.click = click;

	function draw(iX, iY) {
		// drawing code here

		// borders
		ctx.fillStyle="#000";
		if (this.revealed) ctx.strokeRect(iX, iY, TILE_SIZE, TILE_SIZE);
		else ctx.fillRect(iX, iY, TILE_SIZE-1, TILE_SIZE-1);
		ctx.stroke();

		// contents
		ctx.font = "12px Arial";
		var msg;
		if (this.neighbors == 0) {
			if (this.isMine) {
				msg = "M";
			} else {
				msg = "";
			}
		} else {
			msg = this.neighbors;
		}
		var textDimensions = ctx.measureText(msg);
		ctx.fillText(msg, iX + TILE_SIZE/2 - textDimensions.width/2, iY + TILE_SIZE/2 + 5)
	}

	function click(x, y) {
		if (this.isMine) console.log("boom");
		else {
			// show yourself!
			this.revealed = true;
			if (this.neighbors == 0) {
				// empty space, reveal neighbors
				board.handleClick(x-1, y-1); // upleft
				board.handleClick(x, y-1); // up
				board.handleClick(x+1, y-1); // upright
				board.handleClick(x-1, y); // left
				board.handleClick(x+1, y); // right
				board.handleClick(x-1, y+1); // downleft
				board.handleClick(x, y+1); // down
				board.handleClick(x+1, y+1); // downright
			}
		}
	}
};