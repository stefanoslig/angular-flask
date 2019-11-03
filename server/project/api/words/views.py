# project/api/words/views.py
import random

from pluck import pluck, ipluck
from flask import Blueprint, request
from flask_restful import Api, Resource
from sqlalchemy import exc

from project.api.words.models import Word
from project import db

words_blueprint = Blueprint("words", __name__)
api = Api(words_blueprint)


class Words(Resource):
    def get(self):
        words = [score.to_json() for score in Word.query.all()]
        random_word = random.choice(pluck(words, "word"))
        response_object = {
            "word": random_word,
        }
        return response_object, 200

    def post(self):
        post_data = request.get_json()
        response_object = {"status": "fail", "message": "Invalid payload."}
        if not post_data:
            return response_object, 400
        word = post_data.get("word")
        try:
            db.session.add(Word(word=word))
            db.session.commit()
            response_object["status"] = "success"
            response_object["message"] = f"{word} was added!"
            return response_object, 201
        except exc.IntegrityError:
            db.session.rollback()
            return response_object, 400


api.add_resource(Words, "/words")
