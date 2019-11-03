# project/api/games/models.py


import os

from sqlalchemy.sql import func

from project import db


class Game(db.Model):

    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), nullable=False)
    state = db.Column(db.String(), nullable=False)
    created_date = db.Column(db.DateTime, default=func.now(), nullable=False)

    def __init__(self, username="", state=""):
        self.username = username
        self.state = state

    def to_json(self):
        self.created_date = str(self.created_date)
        return {
            "id": self.id,
            "username": self.username,
            "state": self.state,
            "created_date": self.created_date
        }
