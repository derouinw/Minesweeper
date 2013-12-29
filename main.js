// main.js
// entry point for the program
// other stuff too i guess

function startGame() {
	controller = new GameController();
	controller.load();
}

// Get offset of canvas from window
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function getMouse() {
    // Handle offset canvas has from window
    var offset = getOffset(c);

    var mx = event.clientX - offset.left;
    var my = event.clientY - offset.top;

    mouseLoc = { _mx: mx, _my: my };
    return mouseLoc;
}

function clickEvent() {
	var mouseLoc = getMouse();
	// when the click comes you better be ready
	var x = Math.floor(mouseLoc._mx / TILE_SIZE);
	var y = Math.floor(mouseLoc._my / TILE_SIZE);
	controller.handleClick(x, y);
}