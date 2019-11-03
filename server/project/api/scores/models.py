# project/api/models.py


import os

from sqlalchemy.sql import func

from project import db


class Score(db.Model):

    __tablename__ = "scores"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(128), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    created_date = db.Column(db.DateTime, default=func.now(), nullable=False)

    def __init__(self, username="", score=0):
        self.username = username
        self.score = score

    def to_json(self):
        self.created_date = str(self.created_date)
        return {
            "id": self.id,
            "username": self.username,
            "score": self.score,
            "created_date": self.created_date
        }
