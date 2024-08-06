import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = 'Content-Type'
    BROKER_URL = 'redis://localhost:6379/0'
    CELERY_BROKER_URL = 'redis://redis-business:6379/0'
    CELERY_RESULT_BACKEND = 'redis://redis-business:6379/0'