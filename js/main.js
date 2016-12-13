window.onload = function() {
	gameStart();

	$('#userInput').keydown(function(event) {
		if(event.keyCode === 13) return false;
	});

};

var game = {
	quote: 'This is where the quote will live',
	spaceCount: 0,
	quoteLetters:[],
	quoteLettersPlaceholder: [],
	goodLetters: [],
	badLetters: [],
	placeholder: '_',
	lives: 10, // should be 10
	currentLetter: '',
	guessed: false
};

// ======================
// Game Functions
// ======================

function gameStart() {
	quoteSplit();
	showQuote();
	numLives();
	userInput();
	userReset();
	console.log(game.quoteLetters);
}

// ======================
// Quote
// ======================

function quoteSplit() {
	game.quoteLetters = game.quote.toUpperCase().split('');
	game.spaceCount = game.quote.split(' ').length - 1;	

	for(var i = 0; i < game.quoteLetters.length; i++) {
		if (game.quoteLetters[i] !== ' ') {
			game.quoteLettersPlaceholder.push(game.placeholder + ' ');
		} else {
			game.quoteLettersPlaceholder.push('&emsp;');
		}
	}
}	

function showQuote() {
	$('#quoted').html(game.quoteLettersPlaceholder);
}

// ======================
// Input
// ======================

function userInput(){
	$('#guess').click(function() {
		game.currentLetter = $('#userInput').val().toUpperCase();
		
		repeatLetter();
		clearInput();
	});
}

function validLetter() {
	var regex = /[a-zA-Z]/;
	
	if(!game.currentLetter.match(regex)){
		alert('Please enter a letter (A-Z) only');
	}
}

function compareInput() {
	validLetter();
	
	for (var i = 0; i < game.quoteLetters.length; i++){

		if (game.currentLetter === game.quoteLetters[i] && game.currentLetter !== ' ') {
			game.quoteLettersPlaceholder[i] = game.quoteLetters[i].replace(game.placeholder, game.currentLetter);
			
			if(game.goodLetters.indexOf(game.currentLetter) === -1) {
				game.goodLetters.push(game.currentLetter);
			} 
		
			// gameWin();
		} 
		else if (game.currentLetter !== game.quoteLetters[i] && game.quoteLetters.indexOf(game.currentLetter) === -1){			
			if(game.badLetters.indexOf(game.currentLetter) === -1) {
				game.badLetters.push(game.currentLetter);
				game.badLetters.sort();

				incorrectLetters();
				gameOver();
			}
		}
	}

	showQuote();

	$('#used span').html(game.badLetters + ', &emsp;');
}

function repeatLetter() {
	if(game.goodLetters.indexOf(game.currentLetter) === -1 && game.badLetters.indexOf(game.currentLetter) === -1){
		compareInput();
	}
}

function clearInput() {
	$('#userInput').val('');
}

// ======================
// Other Game Functions
// ======================

function numLives() {
	$('#lives').html('You have ' + game.lives + ' lives left');
}

function incorrectLetters() {
	game.lives-=1;
	numLives();
}

// function gameWin() {
// 	if(game.lives > 0 ) {
// 		console.log('you win');
// 		$('body').css('background', 'green');

// 		setTimeout(reset, 2000);
// 	}
// }

function gameOver(){
	if(game.lives === 0) {
		console.log('game over');
		$('body').css('background', 'red');

		setTimeout(reset, 2000);
	}
}

function userReset(){
	$('#reset').click(function() {
		reset();
	});
}

function reset() {
	game.lives = 10; // should be 10
	game.triedLetters = [];
	$('body').css('background', '#fff');	
	numLives();
}

// ======================
// API
// ======================