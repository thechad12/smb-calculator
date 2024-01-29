from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object("config.Config")
cors = CORS(app)
db = SQLAlchemy(app)


from database.models.business import Business
from database.models.metrics import Metrics
from database.models.deal_box import DealBox

target_metadata = [Business, Metrics, DealBox]
migrate = Migrate(app, db)