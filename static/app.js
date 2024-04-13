let score = 0;
let timeLeft = 60;
let canGuess = true;
let words = new Set();
$(document).ready(function() {
    console.log('readybbbbb');
    $('#guess-form').on('submit', async function(e) {
        console.log('submit to me')
        e.preventDefault();
        const guess = $('#guess').val();
        if (words.has(guess)){
            $('#response').text(`${guess} is already guessed`);
            return;
        }

        words.add(guess)
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
            highScore();
        }
    }, 1000);
});

function setScore(value) {
    score += value;
    $('#score').text(`Score: ${score}`);
}

async function time_down() {
    timeLeft -= 1;
    showTime();
}

function showTime() {
    $('#timer').text(`Time: ${timeLeft}`);
}

async function highScore(){
    const res = await axios.post("/high-score", { score: score });
}