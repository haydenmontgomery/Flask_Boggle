$(document).ready(function() {
    $('#guess-form').on('submit', async function(e) {
            e.preventDefault();
            const guess = $('#guess').val();
            console.log(guess)
            const res = await axios.get("/guess", { params: { guess: guess }});
            if (res.data.result === "not-word") {
                $('#response').text(`${guess} is not a word`);
            } else if (res.data.result === "not-on-board") {
                $('#response').text(`${guess} is not on this board`);
            } else {
                $('#response').text(`${guess} added`);
            }
        });
    });

/*     async function sendWord(q){
        const guess = q;
        
        console.log(response.data);
        console.log(res);
    }
}); */
/* function printResponse() */