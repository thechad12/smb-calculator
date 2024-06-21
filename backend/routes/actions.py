import json
import calculations.calc as calc
from flask import Blueprint, request, jsonify
from database.models.business import Business
from database.models.deal_box import DealBox
from database.models.metrics import Metrics
from main import db
from routes.utils import validate_required_fields

actions = Blueprint('actions', __name__)

@actions.route('/add_business', methods=['POST'])
def add_business():
    data = request.get_json()
    if isinstance(data, list):
        data = data[0]
    required_fields = (
        'name', 
        'location', 
        'description', 
        'biz_type'
    )
    validate_required_fields(data, required_fields) 

    new_business = Business(
        name=data.get('name'),
        location=data.get('location'),
        description=data.get('description'),
        biz_type=data.get('biz_type'),
    )
    db.session.add(new_business)
    db.session.commit()

    return jsonify({'message': 'Business added successfully'}), 201


@actions.route('/add_deal_box', methods=['POST'])
def add_deal_box():
    data = request.get_json()
    required_fields = (
        'name', 
        'valuation_low', 
        'valuation_high', 
        'revenue_low', 
        'revenue_high'
    )
    validate_required_fields(data, required_fields)

    new_deal_box = DealBox(
        name=data.get('name'),
        valuation_low=data.get('valuation_low'),
        valuation_high=data.get('valuation_high'),
        revenue_low=data.get('revenue_low'),
        revenue_high=data.get('revenue_high'),
        cashflow_low=data.get('cashflow_low'),
        cashflow_high=data.get('cashflow_high'),
        ask_price_low=data.get('ask_price_low'),
        ask_price_high=data.get('ask_price_high'),
        margin=data.get('margin'),
        sector=data.get('sector'),
        advantages=data.get('advantages'),
        multiple_low=data.get('multiple_low'),
        multiple_high=data.get('multiple_high'),
    )
    db.session.add(new_deal_box)
    db.session.commit()

    return jsonify({'message': 'Deal Box added successfully'}), 201


@actions.route('/add_business_metrics', methods=['POST'])
def add_business_metrics():
    data = request.get_json()
    required_fields = (
        'business_name', 
        'cashflow', 
        'ask_price', 
        'gross_revenue', 
        'valuation', 
        'revenue', 
        'sector', 
        'geography', 
        'scale', 
        'advantages', 
        'investor', 
        'multiple'
    )
    business = db.session.query(Business).filter_by(
        Business.name == data.business_name).first()
    if not business:
        return jsonify({'error': 'Business does not exist'}), 400
    data['business_uid'] = business.uid
    # Validate the incoming data
    validate_required_fields(data, required_fields)

    new_metrics = Metrics(**{**data})
    db.session.add(new_metrics)
    db.session.commit()

    return jsonify({'message': 'Business Metrics added successfully'}), 201



