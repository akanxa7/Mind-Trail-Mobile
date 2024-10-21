let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green", "brown", "orange", "pink", "blue"];
let started = false;
let level = 0;
let highscore = 0; // Variable to store the high score

let h2 = document.querySelector("h2");    
let highscoreElement = document.getElementById("highscore");

// Replace keypress event with touchstart or click event for mobile compatibility
document.addEventListener("touchstart", function() {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    console.log("Level up! Current level:", level);
    h2.innerText = `Level ${level}`; // Corrected template literal
    
    let randidx = Math.floor(Math.random() * btns.length);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`); // Corrected selector syntax
    
    gameseq.push(randcolor);
    gameflash(randbtn);

    setTimeout(() => {
        console.log("Checking highscore");
        updateHighscore(level);
    }, 1000);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over!! Your score was <b>${level}</b><br>Tap anywhere to restart.`; // Corrected template literal
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
    
        reset();
    }
}

function btnpress() {
    let btn = this;
    
    userflash(btn);
    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress); // Click event for button presses
}

// Function to reset the game state
function reset() {
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}

// Update and display the high score
function updateHighscore(score) {
    highscore = Math.max(highscore, score);
    if (highscoreElement) {
        highscoreElement.innerText = `Highscore: ${highscore}`; // Corrected template literal
    } else {
        highscoreElement = document.createElement("h3");
        highscoreElement.id = "highscore";
        highscoreElement.innerText = `Highscore: ${highscore}`; // Corrected template literal
        document.body.appendChild(highscoreElement);
    }
}
