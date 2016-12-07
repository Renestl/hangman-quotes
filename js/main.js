window.onload = function() {
	gameStart();
}

var game = {
	quote: "This is where the quote will live",
	quoteLetters:[],
	quoteLettersPlaceholder: [],
	goodLetters: [],
	triedLetters: [],
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
	game.quoteLetters = game.quote.toLowerCase().split('');

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

function reset() {
	game.triedLetters = [];
	game.lives = 10; // should be 10
}

function userInput() {
	$('#guess').click(function() {
		game.currentLetter = $('#userInput').val().toLowerCase();
		
		compareInput();
	});
}

function compareInput() {

	for (i = 0; i < game.quoteLetters.length; i++){

		if (game.quoteLetters[i] === game.currentLetter) {
			game.quoteLettersPlaceholder[i] = game.quoteLetters[i].replace(game.placeholder, game.currentLetter);
			game.goodLetters.push(game.currentLetter);
		} 

		else {
			// incorrectLetters();
			//TODO: incorporate logic if game.currentLetter is wrong
		}
	};

	showQuote();
}

// function incorrectLetters() {
	
// 		if(game.currentLetter !== game.triedLetters[i]) {
// 			game.triedLetters.push(game.currentLetter);
// 			console.log(game.triedLetters);
// 		}
	
	
// 	$('#used span').html(game.triedLetters);
// }