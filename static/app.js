let score = 0;
let timeLeft = 60;
let canGuess = true;
let words = new Set();
$(document).ready(function() {
    $('#guess').focus();
    $('#guess-form').on('submit', async function(e) {
        e.preventDefault();
        if(canGuess){
            const guess = $('#guess').val();
            if (words.has(guess)){
                $('#response').text(`${guess} is already guessed`);
                return;
            }

            words.add(guess)
            const res = await axios.get("/guess", { params: { guess: guess }});
            changeDisplay(res.data.result, guess);
            $('#guess').val('');
        }
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
    const res = await axios.post("/high_score", { score: score });
    if (res.data.newRecord){
        $('#high-score').text(`High Score: ${score}`);
        $('#response').text("You got a new High Score!!");
    } else {
        $('#response').text("Keep trying to get a High Score!");
    }
}

async function changeDisplay(result, guess){
    console.log(result)
    if (result === "not-word") {
        $('#response').text(`${guess} is not a word`);
    } else if (result === "not-on-board") {
        $('#response').text(`${guess} is not on this board`);
    } else {
        $('#response').text(`${guess} added`);
        const value = guess.length;
        setScore(value);
    }
}