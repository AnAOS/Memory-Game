
const cards = document.querySelectorAll(".card");
const newCards = Array.from(cards);
let firstflip = true;
let firstCard, secondCard;
let lockBoard = false;
const scoresDisplay = document.querySelector(".scores p")
let scores = 0;
const reset = document.querySelector(".reset");
const play = document.querySelector(".play");
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".close");
console.log(closePopup)


shuffle();
scoresDisplay.textContent = localStorage.getItem("scores") || "0";

newCards.forEach(ele =>{ ele.addEventListener("click", turnCard) })
reset.addEventListener("click", resetGame )
play.addEventListener("click", playAgain )
closePopup.addEventListener("click", closeWindow)

function turnCard(){
	if(lockBoard){return}
	if(firstCard === this) {return}

	this.classList.add("show");

	if(firstflip){

		firstCard = this;
		firstflip = false;
	}
	else{
		secondCard = this;
		firstflip = true;

		match();
		winGame();
	}
}

function match(){

	if(firstCard.dataset.card === secondCard.dataset.card){
		firstCard.removeEventListener("click", turnCard);
		secondCard.removeEventListener("click", turnCard);
		resetBoard();
	}

	else{
		lockBoard = true;	
		setTimeout(function(){
			firstCard.classList.remove("show");
			secondCard.classList.remove("show");
		resetBoard();
		}, 1000);
	}
}

function winGame(){
	const win = newCards.every(el => { return el.classList.contains("show"); })
	if(win){ 
		scores++;
		setTimeout(() => { popup.classList.remove("hidden") }, 500);
	}
	let currentTotalScore = new Number(localStorage.getItem("scores") || 0);
	localStorage.setItem("scores", scores + currentTotalScore);
    scoresDisplay.textContent = localStorage.getItem("scores");
}	


function resetBoard(){
	[firstCard, secondCard] = [null, null];
	lockBoard = false;
	firstflip = true;	
}
function resetGame(){
	localStorage.removeItem("scores");
    scoresDisplay.textContent = "0";
	newCards.forEach(ele =>{ ele.classList.remove("show")})
	resetBoard();
	shuffle();
	popup.classList.add("hidden")
	setTimeout(() =>{
		location.reload();
	},500);
}
function playAgain(){
	newCards.forEach(ele =>{ ele.classList.remove("show")})
	resetBoard();
	shuffle();	
	popup.classList.add("hidden")
	setTimeout(() =>{
		location.reload();
	},500);
}

function shuffle(){
	newCards.forEach(el =>{
		let random = Math.floor(Math.random() * newCards.length);
		el.style.order = random;
	})	
}

function closeWindow(){
	popup.classList.add("hidden")
	playAgain();
}