from main import db
import sqlalchemy
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID

class Business(db.Model):

    uid = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=True)
    description = db.Column(db.Text, nullable=True)
    biz_type = db.Column(db.Text, nullable=True)
    

    @property
    def as_dict(self):
        return self.__dict__
    

    @property
    def serialize(self):
        return {
            'uid': str(self.uid),
            'name': self.name,
            'location': self.location,
            'description': self.description,
            'biz_type': self.biz_type
        }