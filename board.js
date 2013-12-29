// board.js
// Contains info about the game board
function Board(iWidth, iHeight) {
	this.width = iWidth;
	this.height = iHeight;
	this.tiles = new Array();

	// functions
	this.setupTiles = setupTiles;
	this.plantMines = plantMines;
	this.draw = draw;
	this.handleClick = handleClick;
	this.printTiles = printTiles;

	function setupTiles() {
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				var tile = new Tile();
				this.tiles.push(tile);
			}
		}
	}

	function plantMines(iNum) {
		// set where mines are
		for (var i = 0; i < iNum; i++) {
			var randomnumber=Math.floor(Math.random()*(this.width*this.height));
			if (this.tiles[randomnumber].isMine == false) this.tiles[randomnumber].isMine = true;
			else i--; // already has a mine try again
		}

		// set up neighbor numbers
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				if (this.tiles[y*this.width + x].isMine == true) continue; // dont need to set neighbors if its already a bomb
				var numNeighbors = 0;
				// go through all neighboors
				if (y > 0) {
					if (this.tiles[(y-1)*this.width + x].isMine) numNeighbors++; // up
					if (x > 0) if (this.tiles[(y-1)*this.width + (x-1)].isMine) numNeighbors++; // upleft
					if (x < this.width) if (this.tiles[(y-1)*this.width + (x+1)].isMine) numNeighbors++; // upright
				}
				if (y < this.height-1) {
					if (this.tiles[(y+1)*this.width + x].isMine) numNeighbors++; // down
					if (x > 0) if (this.tiles[(y+1)*this.width + (x-1)].isMine) numNeighbors++; // downleft
					if (x < this.width-1) if (this.tiles[(y+1)*this.width + (x+1)].isMine) numNeighbors++; // downright
				}
				if (x > 0) {
					if (this.tiles[y*this.width + (x-1)].isMine) numNeighbors++; // left
				}
				if (x < this.width-1) {
					if (this.tiles[y*this.width + (x+1)].isMine) numNeighbors++; // right
				}
				this.tiles[y*this.width + x].neighbors = numNeighbors;
			}
		}
	}

	function draw() {
		// clear canvas
		// Store the current transformation matrix
		ctx.save();

		// Use the identity matrix while clearing the canvas
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Restore the transform
		ctx.restore();

		// drawing stuff duh
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				this.tiles[y*this.width + x].draw(x*TILE_SIZE, y*TILE_SIZE);
			}
		}
	}

	function handleClick(clickX, clickY) { 
		console.log("x: " + clickX + ", y: " + clickY);

		if (clickX >= 0 && clickY >= 0 && clickX < this.width && clickY < this.height && this.tiles[clickY*this.width + clickX].revealed == false) this.tiles[clickY*this.width + clickX].click(clickX, clickY);
		else console.log("gotcha!");
	}

	function printTiles() {
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				console.log("(" + x + ", " + y + "): " + this.tiles[y*this.width+x].neighbors + "; " + this.tiles[y*this.width+x].isMine);
			}
		}
	}


};