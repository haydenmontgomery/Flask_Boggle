from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    # TODO -- write tests for every view function / feature!
    def test_home(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1 id="title">BOGGLE!</h1>', html)


    def test_guess(self):
        with app.test_client() as client:
            with client.session_transaction() as test_session:
                test_session['board'] = [["H", "E", "L", "L", "O"], 
                                         ["H", "E", "L", "L", "O"], 
                                         ["H", "E", "L", "L", "O"], 
                                         ["H", "E", "L", "L", "O"], 
                                         ["H", "E", "L", "L", "O"]]
                
                test_session['guessed_words'] = {'none'}
            res = client.get('/guess?guess=hello')
            self.assertEqual(res.json['result'], 'ok')