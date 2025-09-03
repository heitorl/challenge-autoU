from flask import Flask
from app.routes import init_app as init_routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    init_routes(app)

    return app