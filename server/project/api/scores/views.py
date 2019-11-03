# project/api/scores/views.py


from flask import Blueprint, request
from flask_restful import Api, Resource
from sqlalchemy import exc

from project.api.scores.models import Score
from project import db

scores_blueprint = Blueprint("scores", __name__)
api = Api(scores_blueprint)


class Scores(Resource):
    def get(self):
        response_object = {
            "status": "success",
            "scores": [score.to_json() for score in Score.query.all()]
        }
        return response_object, 200

    def post(self):
        post_data = request.get_json()
        response_object = {"status": "fail", "message": "Invalid payload."}
        if not post_data:
            return response_object, 400
        username = post_data.get("username")
        score = post_data.get("score")
        try:
            db.session.add(Score(username=username, score=score))
            db.session.commit()
            response_object["status"] = "success"
            response_object["message"] = f"{score} was added!"
            return response_object, 201
        except exc.IntegrityError:
            db.session.rollback()
            return response_object, 400


api.add_resource(Scores, "/scores")
