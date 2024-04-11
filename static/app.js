let score = 0;
let timeLeft = 60;
let canGuess = true;
$(document).ready(function() {
    $('#guess-form').on('submit', async function(e) {
        e.preventDefault();
        const guess = $('#guess').val();
        console.log(guess)
        const res = await axios.get("/guess", { params: { guess: guess }});
        if (canGuess == true){  
            if (res.data.result === "not-word") {
                $('#response').text(`${guess} is not a word`);
            } else if (res.data.result === "not-on-board") {
                $('#response').text(`${guess} is not on this board`);
            } else {
                $('#response').text(`${guess} added`);
                const value = guess.length;
                setScore(value);
            }
        }
        $('#guess').val('');
    });

    time_counter = setInterval(() => {
        time_down();
        if (timeLeft <= 0) {
            clearInterval(time_counter);
            canGuess = false;
        }
    }, 1000);
});

function setScore(value) {
    score += value;
    console.log(score);
    $('#score').text(`Score: ${score}`);
}

function time_down() {
    timeLeft -= 1;
    console.log(timeLeft);
    showTime();
/*     if (timeLeft <= 0) {
        canGuess = false;
    } */
}

function showTime() {
    console.log(timeLeft);
    $('#timer').text(`Time: ${timeLeft}`);
}