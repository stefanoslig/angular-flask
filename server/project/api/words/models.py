# project/api/words/models.py


import os

from sqlalchemy.sql import func

from project import db


class Word(db.Model):

    __tablename__ = "words"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    word = db.Column(db.String(128), nullable=False)
    created_date = db.Column(db.DateTime, default=func.now(), nullable=False)

    def __init__(self, word=""):
        self.word = word

    def to_json(self):
        return {
            "id": self.id,
            "word": self.word,
        }
