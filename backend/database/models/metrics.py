from main import db
from sqlalchemy.dialects.postgresql import UUID

class Metric(db.Model):

    uid = db.Column(UUID(as_uuid=True), primary_key=True) 