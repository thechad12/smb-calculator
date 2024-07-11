from main import db
import sqlalchemy
from uuid import uuid4
from sqlalchemy.types import ARRAY
from sqlalchemy.dialects.postgresql import UUID

class Metrics(db.Model):

    uid = db.Column(UUID(as_uuid=True), primary_key=True,
                    default=uuid4)
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
    

    @property
    def serialize(self):
        return {
            'uid': self.uid,
            'business_uid': self.business_uid,
            'cashflow': self.cashflow,
            'ask_price': self.ask_price,
            'gross_revenue': self.gross_revenue,
            'ebitda': self.ebitda,
            'valuation': self.valuation,
            'sector': self.sector,
            'revenue': self.revenue,
            'geography': self.geography,
            'scale': self.scale,
            'advantages': list(self.advantages),
            'investor': self.investor,
            'multiple': self.multiple
        }