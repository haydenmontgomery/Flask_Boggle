from flask import Flask, request, render_template, redirect, jsonify, session, make_response
from boggle import Boggle

from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'abc123' # Very secret
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.debug = True


toolbar = DebugToolbarExtension(app)
boggle_game = Boggle()




@app.route('/')
def home_page():
    board = boggle_game.make_board()
    session['boggle_board'] = board
    highscore = session.get("highscore", 0)
    numPlays = session.get("numPlays", 0)
    return render_template('home.html', highscore = highscore, numPlays = numPlays)

@app.route('/guess')
def find_word():
    guess = request.args["guess"]
    board = session["boggle_board"]
    result = boggle_game.check_valid_word(board, guess)
    return jsonify({'result': result})

@app.route('/high_score', methods=["POST"])
def high_score():
    score = request.json["score"]
    highscore = session.get("highscore", 0)
    numPlays = session.get("numPlays", 0)
    session['numPlays'] = numPlays + 1
    session['highscore'] = max(score, highscore)

    return jsonify(newRecord=score > highscore)