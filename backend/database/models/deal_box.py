from main import db
from sqlalchemy.types import ARRAY
from sqlalchemy.dialects.postgresql import UUID

class DealBox(db.Model):

    uid = db.Column(UUID(as_uuid=True), primary_key=True)
    name = db.Column(db.String, nullable=False)
    valuation_low = db.Column(db.Float)
    valuation_high = db.Column(db.Float)
    revenue_low = db.Column(db.Float)
    revenue_high = db.Column(db.Float)
    profit_low = db.Column(db.Float)
    profit_high = db.Column(db.Float)
    margin = db.Column(db.Float)
    sector = db.Column(ARRAY(db.String))
    seller_type = db.Column(db.String)
    geography = db.Column(ARRAY(db.String))
    scale = db.Column(db.Integer)
    advantages = db.Column(ARRAY(db.String))
    investor = db.Column(db.Boolean)
    multiple_low = db.Column(db.Float)
    multiple_high = db.Column(db.Float)

    @property
    def as_dict(self):
        return self.__dict__
