from main import db
import sqlalchemy
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import ARRAY

class Portfolio(db.Model):

    uid = db.Column(UUID(as_uuid=True), primary_key=True, 
                    default=uuid4)
    name = db.Column(db.String, nullable=False)