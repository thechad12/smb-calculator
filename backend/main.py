from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object("config.Config")
cors = CORS(app)
db = SQLAlchemy(app)


from db import Employee

target_metadata = [Employee]
migrate = Migrate(app, db)

from actions import bp as actions

app.register_blueprint(actions)
