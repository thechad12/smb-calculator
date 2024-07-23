from main import db
import sqlalchemy
from uuid import uuid4
from sqlalchemy.types import ARRAY
from sqlalchemy.dialects.postgresql import UUID

class DealBox(db.Model):

    uid = db.Column(UUID(as_uuid=True), primary_key=True, 
                    default=uuid4)
    name = db.Column(db.String, nullable=False)
    valuation_low = db.Column(db.Float)
    valuation_high = db.Column(db.Float)
    cashflow_low = db.Column(db.Float)
    cashflow_high = db.Column(db.Float)
    ask_price_low = db.Column(db.Float)
    ask_price_high = db.Column(db.Float)
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
    

    @property
    def serialize(self):
        return {
            'name': self.name,
            'cashflow': f'{str(self.cashflow_low)} - {str(self.cashflow_high)}',
            'valuation': f'{str(self.valuation_low)} - {str(self.valuation_high)}',
            'ask_price': f'{str(self.ask_price_low)} - {str(self.ask_price_high)}',
            'revenue': f'{str(self.revenue_low)} - {str(self.revenue_high)}',
            'profit': f'{str(self.profit_low)} - {str(self.profit_high)}',
            'sector': self.sector,
            'investor': self.investor,
            'geography': self.geography,
            'scale': self.scale,
            'advantages': self.advantages,
            'multiple': f'{str(self.multiple_low)} - {str(self.multiple_high)}',
            'is_deal_box': True,
        }
