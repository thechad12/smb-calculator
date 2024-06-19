from main import db
import sqlalchemy
from sqlalchemy.dialects.postgresql import UUID

class Business(db.Model):

    uid = db.Column(UUID(as_uuid=True), primary_key=True, 
                    server_default=sqlalchemy.text("uuid_generate_v4()"),)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=True)
    description = db.Column(db.Text, nullable=True)
    biz_type = db.Column(db.Text, nullable=True)
    
