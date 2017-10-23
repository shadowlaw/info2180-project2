/*Additional features:
- Animations and/or transitions (Grade)
- End-of-game notification
- Game time
*/
window.onload = main;

//Global Vaiable declarations
var blank = ["300px", "300px"]; //coordinates for blank position
var start = false; //indicates game start
var moves = 0; //holds the number of moves made
var start_time = 0; //Game start time
var timer; // variable for timer 
var total_time = 0; // total gameplay time
var best_time = 0;  
var best_moves =0;

//Maze piece Initialization function and returns initial maze state
function start_state() {
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

    return initial_state
}

//Checks if puzzle piece is movable
function is_movable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) - 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) - 100 === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) + 100 === parseInt(blank[1])
}

//Checks if the current state of the maze board is the winning state
function check_for_win(winning_state, pieces) {
    if (start) {
        for (var i = 0; i < pieces.length; i++) {
            if ((winning_state[i][0] !== pieces[i].style.top) | (winning_state[i][1] !== pieces[i].style.left)) {
                return false;
            }
        }
        clearInterval(timer);
        return true;
    }
    return false;
}

//switches piece with blank space
function move_piece(piece, animate) {
    blank_top = piece.style.top;
    blank_left = piece.style.left;

    if (animate) {
        var winning_state = arguments[2];
        var pieces = arguments[3];
        $(piece).animate({ "top": blank[0], "left": blank[1] }, "slow", "linear", function() {
            if (check_for_win(winning_state, pieces)) {
                if(best_time < total_time){
                    best_time = total_time;
                }
                if(best_moves < moves){
                    best_moves = moves
                }
                var win_string = `You Win\nTotal Time: ${seconds_to_time(total_time)} Number of moves: ${moves}\nBest Time: ${seconds_to_time(best_time)} Best Number of Moves: ${best_moves}`;
                $(".explanation")[0].innerText = win_string;
                $(".explanation")[0].style.textAlign = "Center";
            }
        });

    } else {
        piece.style.top = blank[0];
        piece.style.left = blank[1];
    }
    blank = [blank_top, blank_left];
}

//Randomizes the maze board
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

//Returns all maze pieces
function get_pieces() {
    return $(".puzzlepiece");
}

//returns HH:MM:SS time format from seconds
function seconds_to_time(seconds){
    var date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
}

//returns current time since the start of the game
function update_time() {
    var current_date = new Date();
    var current_time = (current_date.getHours() * 60 * 60) + (current_date.getMinutes() * 60) + current_date.getSeconds();
    total_time = current_time - start_time;
    return seconds_to_time(total_time);
}

//Adds game time and moves made to DOM
function update_stats() {
    $(".explanation")[0].innerHTML = `Time: ${update_time()} Moves: ${moves}`;
}

function main() {
    var winning_state = start_state();
    var puzzle_pieces = get_pieces();

    document.getElementById("shufflebutton").onclick = function() {
        random_shuffle(puzzle_pieces);
        start = true;
        moves = 0;
        puzzle_pieces = get_pieces();
        var start_date = new Date();
        start_time = (start_date.getHours() * 60 * 60) + (start_date.getMinutes() * 60) + start_date.getSeconds();
        timer = setInterval(update_stats, 1000);
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
                move_piece(this, true, winning_state, puzzle_pieces);
                moves++;
            }
        });
    }

}