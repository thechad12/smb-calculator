from main import db
from sqlalchemy.dialects.postgresql import UUID

class Metrics(db.Model):

    uid = db.Column(UUID(as_uuid=True), primary_key=True)
    business_uid = db.Column(db.ForeignKey('business.uid', 
                                           onupdate='CASCADE',
                                           ondelete='CASCADE'),
                                           nullable=False)
    cashflow = db.Column(db.Float, nullable=True)
    ask_price = db.Column(db.Float, nullable=False)
    gross_revenue = db.Column(db.Float, nullable=True)
    ebitda = db.Column(db.Float, nullable=True)