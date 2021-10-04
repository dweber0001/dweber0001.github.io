// Array of Card Images
const deckCards = ["cow.jpg", "cow.jpg", "flower.jpg", "flower.jpg", "tree.jpg", "tree.jpg", "match.jpg", "match.jpg", "panda.jpg", "panda.jpg", "sign.jpg", "sign.jpg", "sunflower.jpg", "sunflower.jpg", "surfer.jpg", "surfer.jpg"];

const deck = document.querySelector(".deck");

//empty array to store opened cards
let opened = [];

//empty array to store matched cards
let matched = [];

//create/access the modal
const modal = document.getElementById("modal");

//create/access reset button
const reset = document.querySelector(".reset-btn");

//create/access play again button
const playAgain = document.querySelector(".play-again-btn");

//create moves counter/change its HTML
const movesCount = document.querySelector(".moves-counter");

//variable for counter, set to zero
let moves = 0;

//Create/access star rating section
const star = document.getElementById("star-rating").querySelectorAll(".star");

//variable to track stars
let starCount = 3;

//tag for timer
const timeCounter = document.querySelector(".timer");
//variable to stop time
let time;
//variables for time, set all to zero
let minutes = 0;
let seconds = 0;
// used in click card event listener
let timeStart = false;

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while(currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//start game - invoke shuffle and store in variable
function startGame() {
    const shuffledDeck = shuffle(deckCards);
    for (let i = 0; i < shuffledDeck.length; i++) {
        const liTag = document.createElement('LI');
        liTag.classList.add('card');
        // Create tags for images
		const addImage = document.createElement("IMG");
        liTag.appendChild(addImage);
        addImage.setAttribute("src", "images/" + shuffledDeck[i]);
		// Add an alt tag to the image
        addImage.setAttribute("alt", "puzzle image");
        deck.appendChild(liTag);
    }
}

startGame();

function removeCard(){
    while(deck.hasChildNodes()){
        deck.removeChild(deck.firstChild);
    }
}
//update time for mins/secs, invoked on first card click
function timer() {
    //update count every second
    time = setInterval(function() {
        seconds++;
        if(seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timeCounter.innerHTML = " Timer: " + minutes + " min " + seconds + " sec";
    }, 1000);
}

//stop timer once all cards are matched
function stopTime() {
    clearInterval(time);
}

function resetAll() {
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = " Timer: 00:00";
	star[1].firstElementChild.classList.add("fa-star");
	star[2].firstElementChild.classList.add("fa-star");
	starCount = 3;
    moves = 0;
	movesCount.innerHTML = 0;
    matched = [];
	opened = [];
    removeCard();
	// make a new deck
	startGame();
}
function movesCounter() {
	
	movesCount.innerHTML ++;
	moves ++;
}
function starRating() {
	if (moves === 14) {		
		star[2].firstElementChild.classList.remove("fa-star");
		starCount--;
	}
	if (moves === 18) {
		star[1].firstElementChild.classList.remove("fa-star");
		starCount--;
	}
}

//compare 2 cares for matches
function compareTwo() {
	if (opened.length === 2) {
  		// Disable mouse clicks on other cards
    document.body.style.pointerEvents = "none";
    }
    if (opened.length === 2 && opened[0].src === opened[1].src) {
		// If both images match
		match();		
	} else if (opened.length === 2 && opened[0].src != opened[1].src) {		
        // if images don't match
		noMatch();		
	}
}

function match() {
	
	setTimeout(function() {
		opened[0].parentElement.classList.add("match");
		opened[1].parentElement.classList.add("match");
		matched.push(...opened);
		// Allow  mouse clicks again on cards
		document.body.style.pointerEvents = "auto";
		// Check if game has been won
		winGame();
        opened = [];
	}, 700);
	
	movesCounter();
	starRating();
}
function noMatch() {
	setTimeout(function() {
		opened[0].parentElement.classList.remove("flip");
		opened[1].parentElement.classList.remove("flip");
		document.body.style.pointerEvents = "auto";
		opened = [];
	}, 700);
	movesCounter();
	starRating();
}
function AddStats() {
	const stats = document.querySelector(".modal-content");
	
	for (let i = 1; i <= 3; i++) {		
		const statsElement = document.createElement("p");
		statsElement.classList.add("stats");
		stats.appendChild(statsElement);
	}
    let p = stats.querySelectorAll("p.stats");
			
		p[0].innerHTML = "Time: " + minutes + " Minute " + seconds + " Seconds";
		p[1].innerHTML = "Your # of Moves: " + moves;
		p[2].innerHTML = "Your # of Stars: " + starCount + " out of 3";
}
function displayModal() {
    const modalClose = document.getElementsByClassName("close")[0];
        modal.style.display= "block";
        modalClose.onclick = function() {
            modal.style.display = "none";
        };
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
}

function winGame() {
	if (matched.length === 16) {
		stopTime();
		AddStats();
		displayModal();
	}
}
deck.addEventListener("click", function(event) {
	if (event.target.nodeName === "LI") {
		console.log(event.target.nodeName + " Was clicked");
		
		if (timeStart === false) {
			timeStart = true; 
			timer();
		}
		flipCard();
	}
    //Flip card and display img
	function flipCard() {
        event.target.classList.add("flip");
		addToOpened();
	}
    function addToOpened() {		
		if (opened.length === 0 || opened.length === 1) {
			opened.push(event.target.firstElementChild);
		}
			compareTwo();
	}
}); 

reset.addEventListener('click', resetAll);

playAgain.addEventListener('click', function() {
	modal.style.display = "none";
	resetAll();
});
