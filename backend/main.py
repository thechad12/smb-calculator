from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from celery import Celery


app = Flask(__name__)
app.config.from_object("config.Config")
cors = CORS(app)
db = SQLAlchemy(app)


from database.models.business import Business
from database.models.metrics import Metrics
from database.models.deal_box import DealBox
from database.models.portfolio import Portfolio
from database.models.portfolio_business import PortfolioBusiness

target_metadata = [
    Business, 
    Metrics, 
    DealBox, 
    Portfolio, 
    PortfolioBusiness
]
migrate = Migrate(app, db)

from routes.data import bp
from routes.actions import actions

app.register_blueprint(bp)
app.register_blueprint(actions)

def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL']
    )
    celery.conf.update(app.config)
    celery.conf.task_routes = {
        'actions.scrape_task': {'queue': 'scrape_queue'},
        'actions.delete_businesses_task': {'queue': 'delete_queue'}
    }
    return celery

celery = make_celery(app)
