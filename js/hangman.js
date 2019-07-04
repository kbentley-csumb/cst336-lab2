var selectedWord = "";
var selectedHint = "";
var showingHint = false;
var board = [];
var remainingGuesses = 6;
var previousGuesses = [];
var words = [
    {word: "snake", hint: "It's a reptile" },
    {word: "monkey", hint:"It's a mammal" },
    {word: "beetle", hint: "It's an insect" }];

// Creating an array of available letters
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function startGame() {
    pickWord();
    createLetters();
    initBoard();    
    updateBoard();
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word;
    selectedHint = words[randomInt].hint;
    showingHint = false;
}

function initBoard() {
    for(var letter in selectedWord) {
        board.push("_");
    }
    $("#previousGuesses").empty();
    if(previousGuesses.length > 0) {
        $("#previousGuesses").append("<br>You previously guessed:<br><ul>");
        for(var word of previousGuesses) {
            $("#previousGuesses").append("<li>" + word + "</li>\n");
        }
        $("#previousGuesses").append("</ul>");
    }
}

function updateBoard() {
    $("#word").empty();
    for( var i=0; i < board.length; i++) {
        $("#word").append(board[i] + " ");
    }
    $("#word").append("<br >");
    if(!showingHint) {
        $("#word").append("<a href='#' id='showHint' onclick='hintClick()'><span class='hint'>Click to Show Hint</span> </a>");
    }
    else {
        $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
    }
    
    $("#remainingGuesses").empty();
    updateGuessesRemaining();
}

function createLetters() {
    $("#letters").empty();
    $("#letters").show();
    for(var letter of alphabet) {
        $("#letters").append("<button class='letter btn btn-success' onclick='letterClick(this)' id='" + letter + "'>" + letter + "</button>");
    }
}

function updateGuessesRemaining() {
    $("#remainingGuesses").empty();
    if(remainingGuesses < 2) {
        $("#remainingGuesses").css("background-color", "red")
        
    }
    else if(remainingGuesses < 4) {
        $("#remainingGuesses").css("background-color", "yellow")
    }
    if(remainingGuesses==1) {
        $("#remainingGuesses").append(remainingGuesses + " guess remaining.");
    }
    else {
        $("#remainingGuesses").append(remainingGuesses + " guesses remaining.");
    }
    
}

function checkLetter(letter) {
    var positions = new Array();

    // Put all the positions the letter exists in an array
    for (var i = 0; i < selectedWord.length; i++) {
        if( letter == selectedWord[i].toUpperCase()) {
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
    updateGuessesRemaining();
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
        if(!(selectedWord in previousGuesses)) {
            previousGuesses.push(selectedWord);
        }
        $('#won').show();
    } else {
        $('#lost').show();
    }
}

function disableButton(btn) {
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger");
}

window.onload = startGame();

function letterClick(elem) {
    checkLetter($(elem).attr("id"));
    disableButton($(elem));
}

$(".replayBtn").click(function() {
    remainingGuesses = 6;
    showingHint = false;
    $('#won').hide();
    $('#lost').hide();
    $('#replayBtn').hide();
    $("#remainingGuesses").css("background-color", "white")
    board = [];
    startGame();
});

function hintClick() {
    showingHint = true;    
    remainingGuesses -= 1;
    if (remainingGuesses <= 0) {
        endGame(false);
    }
    updateBoard();
}
