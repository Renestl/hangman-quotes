window.onload = function() {
	gameStart();
}

var game = {
	quote: "This is where the quote will live",
	quoteLetters:[],
	quoteLettersPlaceholder: [],
	goodLetters: [],
	badLetters: [],
	placeholder: '_',
	lives: 10, // should be 10
	currentLetter: '',
	guessed: false
}

function gameStart() {
	quoteSplit();
	showQuote();
	numLives();
	userInput();
	console.log(game.quoteLetters);
}

function quoteSplit() {
	game.quoteLetters = game.quote.toUpperCase().split('');

	for(var i = 0; i < game.quoteLetters.length; i++) {
		if (game.quoteLetters[i] !== " ") {
			game.quoteLettersPlaceholder.push(game.placeholder + ' ');
		} else {
			game.quoteLettersPlaceholder.push("&emsp;");
		}
	}
}	

function showQuote() {
	$('#quoted').html(game.quoteLettersPlaceholder);
}

function numLives() {
	$('#lives').html('You have ' + game.lives + ' lives left');
}

function userInput() {
	$('#guess').click(function() {
		game.currentLetter = $('#userInput').val().toUpperCase();
		
		repeatLetter();
	});
}

function compareInput() {
	for (i = 0; i < game.quoteLetters.length; i++){

		if (game.currentLetter === game.quoteLetters[i]) {
			game.quoteLettersPlaceholder[i] = game.quoteLetters[i].replace(game.placeholder, game.currentLetter);
			
			if(game.goodLetters.indexOf(game.currentLetter) === -1) {
				game.goodLetters.push(game.currentLetter);
			} 
		} 
		else if (game.currentLetter !== game.quoteLetters[i] && game.quoteLetters.indexOf(game.currentLetter) === -1){
			if(game.badLetters.indexOf(game.currentLetter) === -1) {
				game.badLetters.push(game.currentLetter);
				game.badLetters.sort();

				incorrectLetters();
			}
		}
	}

	console.log(game.goodLetters);
	console.log(game.badLetters);
	

	showQuote();

	$('#used span').html(game.badLetters + ", &emsp;");
}

function repeatLetter() {
 	if(game.goodLetters.indexOf(game.currentLetter) === -1 && game.badLetters.indexOf(game.currentLetter) === -1){
 		compareInput();
 	}
 	else {
 		console.log("You already tried that letter");
 	}
}

function incorrectLetters() {
	game.lives-=1;
	numLives();
}

// function gameWin() {

// }

// function gameOver(){
	
// }

function reset() {
	game.triedLetters = [];
	game.lives = 10; // should be 10
}