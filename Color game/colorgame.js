var numberOfSquares = 6;
var colors = generateRandomColors(numberOfSquares);
var squares = document.querySelectorAll('.square');
var pickedColor = pickColor();
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetBtn = document.querySelector('#reset');
var modeBtns = document.querySelectorAll('.mode');

init();

function init(){
	//mode buttons event listeners
	for(var i = 0; i < modeBtns.length; i++){
		modeBtns[i].addEventListener('click', function(){
			modeBtns[0].classList.remove('selected');
			modeBtns[1].classList.remove('selected');
			this.classList.add('selected');
			this.textContent === "Easy" ? numberOfSquares = 3 : numberOfSquares = 6;
			resetGame();
		});
	}
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener('click', clickedSquare);
	}
	resetBtn.addEventListener('click', resetGame);
	colorDisplay.textContent = pickedColor;
	changeAllbackgroundColors();
	resetGame();
}

function clickedSquare(){
	clickedColor = this.style.backgroundColor;
	if(clickedColor === pickedColor){
		messageDisplay.textContent = "Correct!";
		resetBtn.textContent = "Play Again?";
		changeColors(pickedColor);
		h1.style.backgroundColor = clickedColor;
	} else {
		this.style.backgroundColor = 'rgb(4, 15, 74)';
		messageDisplay.textContent = "Try Again";
	}
}

function changeColors(color){
	// all squares change color to winning color
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	// choose a random color from the colors array for the user to find
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//create array
	var arr = [];
	//add num random colors to array
	for(var i = 0; i < num; i++){
		//get ransdom color and push into array
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	// need rgb from 0-255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function resetGame(){
	console.log(numberOfSquares);
	colors = generateRandomColors(numberOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	changeAllbackgroundColors();
	h1.style.backgroundColor = 'steelblue';
	messageDisplay.textContent = '';
	resetBtn.textContent = 'New Colors';
	for(var i = 0; i < 6; i++){
		if(colors[i]){
			squares[i].style.display = 'block';
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = 'none';
		}
	}
}

function changeAllbackgroundColors(){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
}