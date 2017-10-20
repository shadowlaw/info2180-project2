window.onload = main;

function initail_state() {
    var puzzle_area = document.getElementById("puzzlearea").childNodes;
    var puzzle_pieces = [];
    var x = 0,
        y = 0,
        top = 0,
        left = 0,
        piece_counter = 1;

    for (let i = 0; i < puzzle_area.length; i++) {
        if (puzzle_area[i].nodeName == "DIV") {
            puzzle_pieces.push(puzzle_area[i]);
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

    return puzzle_pieces
}

function move_piece(piece, top, left) {
    piece.style.top = top;
    piece.style.left = left;
}

function main() {
    var puzzle_pieces = initail_state
    var free_space = ["300", "300"];


}