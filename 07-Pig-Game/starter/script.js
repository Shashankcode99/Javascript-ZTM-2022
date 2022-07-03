'use strict';

let currentScore ;
let activePlayer; 
let finalScore ;
let playingState;

const init=function()
{
    finalScore = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playingState = true;
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
}

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--0`).classList.toggle('player--active');
    document.querySelector(`.player--1`).classList.toggle('player--active');
}


document.querySelector('.btn--roll').addEventListener('click', function () {
    if (playingState) {

        let diceNumber = Math.trunc(Math.random() * 6) + 1;
        document.querySelector('.dice').src = `dice-${diceNumber}.png`;


        if (diceNumber !== 1) {
            currentScore = currentScore + diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;


        }
        else {
            switchPlayer();
        }
    }
})


document.querySelector('.btn--hold').addEventListener('click', function () {
    if (playingState) {
        finalScore[activePlayer] = finalScore[activePlayer] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = finalScore[activePlayer];
        if (finalScore[activePlayer] >= 100) {
            document.querySelector('.dice').classList.add('hidden');
            playingState = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }
    }
})


document.querySelector('.btn--new').addEventListener('click',init);