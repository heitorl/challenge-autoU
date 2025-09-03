from flask import Blueprint, Flask
from .email_route import bp_email

bp_api = Blueprint("bp_api", __name__, url_prefix="/api")

def init_app(app: Flask):

    bp_api.register_blueprint(bp_email)
    
    app.register_blueprint(bp_api)