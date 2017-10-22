window.onload = main;

var blank = ["300px", "300px"];

function initail_state() {
    var puzzle_area = document.getElementById("puzzlearea").childNodes;
    var initial_state = [];

    var x = 0,
        y = 0,
        top = 0,
        left = 0,
        piece_counter = 1;

    for (let i = 0; i < puzzle_area.length; i++) {
        if (puzzle_area[i].nodeName == "DIV") {
            initial_state.push([top.toString() + "px", left.toString() + "px"]);
            puzzle_area[i].className += "puzzlepiece";
            puzzle_area[i].setAttribute("style", `background-position: ${x}px ${y}px; top: ${top}px; left: ${left}px;`);
            x -= 100;
            left += 100;

            if (piece_counter % 4 == 0) {
                y -= 100;
                top += 100;
                left = 0
            }
            piece_counter += 1;

        }
    }

    return initail_state
}

function is_movable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) - 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) - 100 === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) + 100 === parseInt(blank[1])
}

function move_piece(piece, animate) {
    blank_top = piece.style.top;
    blank_left = piece.style.left;

    if (animate) {
        $(piece).animate({ "top": blank[0], "left": blank[1] }, "slow");
    } else {
        piece.style.top = blank[0];
        piece.style.left = blank[1];
    }
    blank = [blank_top, blank_left];
}

function random_shuffle(pieces) {
    var pieceLength = pieces.length;
    var piece;
    var rand;

    for (var index = 0; index < pieceLength; index++) {
        rand = Math.floor(Math.random() * pieces.length);
        piece = pieces.splice(rand, 1);
        move_piece(piece[0], false);
    }
}

function get_pieces() {
    return $('.puzzlepiece');
}

function main() {
    var winning_state = initail_state();
    var puzzle_pieces = get_pieces();

    document.getElementById("shufflebutton").onclick = function() {
        random_shuffle(puzzle_pieces);
        puzzle_pieces = get_pieces();
    }

    for (var i = 0; i < puzzle_pieces.length; i++) {
        puzzle_pieces[i].addEventListener("mouseover", function() {
            if (is_movable(this)) {
                this.className = "puzzlepiece movablepiece";
            }
        });

        puzzle_pieces[i].addEventListener("mouseleave", function() {
            this.className = "puzzlepiece";
        });

        puzzle_pieces[i].addEventListener("click", function() {
            if (this.className.includes("movablepiece")) {
                move_piece(this, true);
            }
        });
    }

}