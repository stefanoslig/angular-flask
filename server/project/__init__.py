# server/__init__.py


import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


# instantiate the extensions
db = SQLAlchemy()


def create_app(script_info=None):

    # instantiate the app
    app = Flask(__name__)
    CORS(app, origins=['http://localhost:4200'])

    # set config
    app.config.from_object("project.config.Config")

    # set up extensions
    db.init_app(app)

    # register blueprints
    from project.api.scores.views import scores_blueprint

    app.register_blueprint(scores_blueprint)

    from project.api.words.views import words_blueprint

    app.register_blueprint(words_blueprint)
    
    from project.api.games.views import games_blueprint

    app.register_blueprint(games_blueprint)

    # shell context for flask cli
    @app.shell_context_processor
    def ctx():
        return {"app": app, "db": db}

    return app

