var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = ["snake", "monkey", "beetle"];

// Creating an array of available letters
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


//console.log(words[0]);

function startGame() {
    pickWord();
    createLetters();
    initBoard();
    
    updateBoard();
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt];
}

function initBoard() {
    for(var letter in selectedWord) {
        board.push("_");
    }
}

function updateBoard() {
    $("#word").empty();
    for(var letter of board) {
        document.getElementById("word").innerHTML += letter + " ";
    }
}

/*
$("#letterBtn").click(function() {
    var boxVal = $("#letterBox").val();
    console.log("You pressed the button and it had the value: " + boxVal);
});

*/

function createLetters() {
    for(var letter of alphabet) {
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button> &nbsp;");
    }
}


function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].toUpperCase();
}

function checkLetter(letter) {
    var positions = new Array();

    // Put all the positions the letter exists in an array
    for (var i = 0; i < selectedWord.length; i++) {
        if( letter == selectedWord[i]) {
            positions.push(i);
        }
    }

    if(positions.length > 0) {
        updateWord(positions, letter);

        // Check to see if this is a winning guess
        if (!board.includes('_')) {
            endGame(true);
        }
    } else {
        remainingGuesses -= 1;
        updateMan();
    }

    if (remainingGuesses <= 0) {
        endGame(false);
    }
}

function updateWord(positions, letter) {
    for( var pos of positions) {
        board[pos] = letter;
    }
    updateBoard();
}

function updateMan() {
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

function endGame(win) {
    $("#letters").hide();

    if(win) {
        $('#won').show();
    } else {
        $('#lost').show();
    }
}

window.onload = startGame();

$(".letter").click(function(){
    //console.log($(this).attr("id"));
    checkLetter($(this).attr("id"));
});

$(".replayBtn").click(function() {
    location.reload();
});