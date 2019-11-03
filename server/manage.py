from project import create_app, db
from project.api.scores.models import Score
from project.api.games.models import Game
from project.api.words.models import Word
from flask.cli import FlaskGroup


app = create_app()
cli = FlaskGroup(create_app=create_app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    db.session.add(Word(word="layer"))
    db.session.add(Word(word="order"))
    db.session.add(Word(word="marvin"))
    db.session.add(Word(word="3dhubs"))
    db.session.add(Word(word="print"))
    db.session.commit()


if __name__ == "__main__":
    cli()
