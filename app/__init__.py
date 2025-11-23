
from flask import Flask

from app import routes

def create_app():
    app = Flask(__name__)

    app.register_blueprint(routes.home_bp)
    app.register_blueprint(routes.waves_bp)

    return app