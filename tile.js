// tile.js
// Contains code describing individual tiles
function Tile() {
	this.isMine = false;
	this.neighbors = 0;
	this.revealed = false;
	this.flagged = false;

	this.draw = draw;
	this.click = click;
	this.rightClick = rightClick;
	this.reset = reset;

	function draw(iX, iY) {
		// drawing code here

		// borders
		ctx.fillStyle="#000";
		if (!this.revealed) {
			ctx.fillRect(iX, iY, TILE_SIZE-1, TILE_SIZE-1);
			ctx.stroke();

			if (this.flagged) {
				ctx.strokeStyle = "#DDD";
				ctx.moveTo(iX + TILE_SIZE/2, iY + TILE_SIZE/4);
				ctx.lineTo(iX + TILE_SIZE/2, iY + 3*(TILE_SIZE/4));
				ctx.stroke();
			}
		} else {
			ctx.strokeStyle = "#DDD";
			ctx.strokeRect(iX, iY, TILE_SIZE, TILE_SIZE);
			ctx.stroke();

			// contents
			ctx.font = "24px Arial";
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
			ctx.fillText(msg, iX + TILE_SIZE/2 - textDimensions.width/2, iY + TILE_SIZE/2 + 10);
			ctx.stroke();
		}
	}

	function click(x, y) {
		var e = {
			button: 0
		}; // left click

		if (this.isMine) {
			alert("You lose!");
			state = GameState.WIN;
		}
		else {
			// show yourself!
			if (!this.flagged) this.revealed = true;
			if (this.neighbors == 0) {
				// empty space, reveal neighbors
				board.handleClick(x-1, y-1, e); // upleft
				board.handleClick(x, y-1, e); // up
				board.handleClick(x+1, y-1, e); // upright
				board.handleClick(x-1, y, e); // left
				board.handleClick(x+1, y, e); // right
				board.handleClick(x-1, y+1, e); // downleft
				board.handleClick(x, y+1, e); // down
				board.handleClick(x+1, y+1, e); // downright
			}
		}
	}

	function rightClick(x, y, e) {
		if (!this.revealed) {
			this.flagged = !this.flagged;
			if (this.flagged) board.numMines++;
			else board.numMines--;
		} else {
			// if its been revealed see if you can reveal neighbors
			var neighborFlags = 0;
			if (board.flagged(x-1, y-1)) neighborFlags++; // upleft
			if (board.flagged(x, y-1)) neighborFlags++; // up
			if (board.flagged(x+1, y-1)) neighborFlags++; // upright
			if (board.flagged(x-1, y)) neighborFlags++; // left
			if (board.flagged(x+1, y)) neighborFlags++; // right
			if (board.flagged(x-1, y+1)) neighborFlags++; // downleft
			if (board.flagged(x, y+1)) neighborFlags++; // down
			if (board.flagged(x+1, y+1)) neighborFlags++; // downright

			if (neighborFlags == this.neighbors) {
				// reveal those neightbors that arent mines
				var v = { button: LEFT };
				if (!board.flagged(x-1, y-1)) board.handleClick(x-1, y-1, v); // upleft
				if (!board.flagged(x, y-1)) board.handleClick(x, y-1, v); // up
				if (!board.flagged(x+1, y-1)) board.handleClick(x+1, y-1, v); // upright
				if (!board.flagged(x-1, y)) board.handleClick(x-1, y, v); // left
				if (!board.flagged(x+1, y)) board.handleClick(x+1, y, v); // right
				if (!board.flagged(x-1, y+1)) board.handleClick(x-1, y+1, v); // downleft
				if (!board.flagged(x, y+1)) board.handleClick(x, y+1, v); // down
				if (!board.flagged(x+1, y+1)) board.handleClick(x+1, y+1, v); // downright
			}		
		}
	}

	function reset() {
		this.isMine = false;
		this.neighbors = 0;
		this.revealed = false;
		this.flagged = false;
	}
};