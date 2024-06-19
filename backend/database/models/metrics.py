from main import db
import sqlalchemy
from sqlalchemy.types import ARRAY
from sqlalchemy.dialects.postgresql import UUID

class Metrics(db.Model):

    uid = db.Column(UUID(as_uuid=True), primary_key=True,
                    server_default=sqlalchemy.text("uuid_generate_v4()"),)
    business_uid = db.Column(db.ForeignKey('business.uid', 
                                           onupdate='CASCADE',
                                           ondelete='CASCADE'),
                                           nullable=False)
    cashflow = db.Column(db.Float, nullable=True)
    ask_price = db.Column(db.Float, nullable=False)
    gross_revenue = db.Column(db.Float, nullable=True)
    ebitda = db.Column(db.Float, nullable=True)
    valuation = db.Column(db.Float)
    revenue = db.Column(db.Float)
    sector = db.Column(db.String)
    geography = db.Column(db.String)
    scale = db.Column(db.Float)
    advantages = db.Column(ARRAY(db.String))
    investor = db.Column(db.Boolean)
    multiple = db.Column(db.Float)


    @property
    def as_dict(self):
        return self.__dict__