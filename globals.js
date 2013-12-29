// globals.js
// holds global stuff

// Constants
var TILE_SIZE = 16;
var BOARD_SIZE = {
	WIDTH : 10,
	HEIGHT : 10
};
var NUM_MINES = 20;

// Game states
var GameState = {
	LOAD: 0, // loading before game
	PLAY: 1
};

var state = GameState.LOAD;

// Game fundies
var board;
var controller;