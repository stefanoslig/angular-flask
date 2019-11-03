# project/api/scores/views.py


from flask import Blueprint, request
from flask_restful import Api, Resource
from sqlalchemy import exc

from project.api.games.models import Game
from project import db

games_blueprint = Blueprint("games", __name__)
api = Api(games_blueprint)


class Games(Resource):
    def get(self):
        response_object = {
            "status": "success",
            "states": [state.to_json() for state in Game.query.all()]
        }
        return response_object, 200

    def post(self):
        post_data = request.get_json()
        response_object = {"status": "fail", "message": "Invalid payload."}
        if not post_data:
            return response_object, 400
        username = post_data.get("username")
        state = post_data.get("state")
        try:
            db.session.add(Game(username=username, state=state))
            db.session.commit()
            response_object["status"] = "success"
            response_object["message"] = f"{state} was added!"
            return response_object, 201
        except exc.IntegrityError:
            db.session.rollback()
            return response_object, 400


api.add_resource(Games, "/games")
