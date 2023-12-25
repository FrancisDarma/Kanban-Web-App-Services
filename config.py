import os
from datetime import timedelta
from sqlalchemy import create_engine, text

basedir = os.path.abspath(os.path.dirname(__file__))
DB_URI = 'postgresql://mypostgres:secretpass@my-postgres-container:5432/flask-app_db'

engine = create_engine(DB_URI)

class Config:
    SECRET_KEY = '123'
    SQLALCHEMY_DATABASE_URI = DB_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_TOKEN_LOCATION = ["headers"]
    JWT_SECRET_KEY = "super-secret"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days = 30)
