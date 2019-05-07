/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let score, roundScore, activePlayer, playingGame, prevRoll;

//initialize game on load
init();

//-------------------ROLL DICE
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (playingGame) {
    let dice = Math.floor(Math.random() * 6) + 1;
    if (prevRoll === 6 && dice === 6) {
      score[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent =
        score[activePlayer];
      nextPlayer();
      console.log("You rolled two sixes in a row");
    } else {
      roundScore += dice;
      document.querySelector(".dice").src = "dice-" + dice + ".png";
      document.querySelector(".dice").style.display = "block";
      document.getElementById("current-" + activePlayer).innerHTML = roundScore;
      prevRoll = dice;
      if (dice === 1) {
        nextPlayer();
      }
    }
  }
});

//------------------HOLD SCORE
document.querySelector(".btn-hold").addEventListener("click", () => {
  if (playingGame) {
    score[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent =
      score[activePlayer];
    //-------------------------WINNER!!!!
    if (score[activePlayer] >= 100) {
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document.getElementById("name-" + activePlayer).textContent = "Winner";
      playingGame = false;
    } else {
      nextPlayer();
    }
  }
});

//------------------NEW GAME
document.querySelector(".btn-new").addEventListener("click", () => {
  init();
});

function nextPlayer() {
  prevRoll = 0;
  roundScore = 0;
  document.getElementById("current-" + activePlayer).innerHTML = roundScore;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function init() {
  playingGame = true;
  activePlayer = 0;
  score = [0, 0];
  roundScore = 0;
  prevRoll = 0;
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
