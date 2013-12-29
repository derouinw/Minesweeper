// game.js
// Holds game controller

function GameController() {
	this.load = load;
	this.main = main;
	this.handleClick = handleClick;
	
	function load() {
		// Board setup
		board = new Board(BOARD_SIZE.WIDTH, BOARD_SIZE.HEIGHT);
		board.setupTiles();
		board.plantMines(NUM_MINES);

		// graphics stuff
		c = document.getElementById("canvas");
		ctx = c.getContext("2d");

		// setinterval stuff
		_intervalId = setInterval(main, 1000 / 30);  // 2nd num is fps
		state = GameState.PLAY;
	}

	function main() {
		// main loop
		switch(state) {
		case GameState.LOAD:
			// nothing yet
			state = GameState.PLAY;
			break;
		case GameState.PLAY:
			// yay we're playing
			board.draw();
			break;
		}
	}

	function handleClick(mx, my) {
		board.handleClick(mx, my);
	}
}