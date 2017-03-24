from flask import Flask
from .web import web
from .api import api


def register_blueprints(my_app):
    my_app.register_blueprint(api, url_prefix='')
    my_app.register_blueprint(web, url_prefix='/web')


def create_app():
    my_app = Flask(__name__)
    register_blueprints(my_app)
    return my_app


app = create_app()



