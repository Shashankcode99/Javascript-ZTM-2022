'use strict';

let randomNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;


document.querySelector('.check').addEventListener('click', function () {

    let guessedNumber = Number(document.querySelector('.guess').value);

    if (guessedNumber === randomNumber) {
        document.querySelector('.message').textContent = 'Woah!! Matched';
        document.querySelector('body').style.backgroundColor = 'green';
        document.querySelector('.number').style.width = '40rem';
        document.querySelector('.number').textContent = randomNumber;
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }

    }

    else if (!guessedNumber) {

        if (score > 0) {
            document.querySelector('.message').textContent = ' NO NUMBER ';
            score--;
            document.querySelector('.score'.textContent = score);
        }

        else {
            document.querySelector('.message').textContent = ' YOU LOST THE GAME ';
        }
    }

    else if (guessedNumber != randomNumber) {
        if (score > 0) {
            document.querySelector('.message').textContent = guessedNumber > randomNumber ? 'Too High!!!' : 'To Low!!!';
            score--;
            document.querySelector('.score').textContent = score;
        }

        else {
            document.querySelector('.message').textContent = ' YOU LOST THE GAME ';
        }
    }
});
    document.querySelector('.again').addEventListener('click', function () {
        randomNumber = Math.trunc(Math.random() * 20) + 1;
        score = 20;
        document.querySelector('.guess').value = '';
        document.querySelector('.message').textContent = 'Start guessing...';
        document.querySelector('.score').textContent = score;
        document.querySelector('body').style.backgroundColor = '#222';
        document.querySelector('.number').style.width = '15rem';
        document.querySelector('.number').textContent = '?';
    });
