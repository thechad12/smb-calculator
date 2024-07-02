from main import db
import sqlalchemy
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID

class PortfolioBusiness(db.Model):
    # Define relationship and cascades between portfolios and businesses

    uid = db.Column(UUID(as_uuid=True), primary_key=True,
                    default=uuid4)
    portfolio_uid = db.Column(db.ForeignKey('portfolio.uid', 
                                           onupdate='CASCADE'),
                                           nullable=False)
    business_uid = db.Column(db.ForeignKey('business.uid', 
                                           onupdate='CASCADE'),
                                           nullable=False)