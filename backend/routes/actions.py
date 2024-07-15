import json
import calculations.calc as calc
from flask import Blueprint, request, jsonify
from database.models.business import Business
from database.models.deal_box import DealBox
from database.models.metrics import Metrics
from main import db
from routes.utils import validate_required_fields

actions = Blueprint('actions', __name__)

@actions.route('/update_businesses', methods=['POST'])
def update_businesses():
    data = request.get_json()
    for row in data:
        business = db.session.query(Business).filter(
            Business.uid == row.get('uid')
        ).first()
        if business:
            for key, value in row.items():
                if hasattr(business, key):
                    setattr(business, key, value)
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                print("there was an exception on committing in update_businesses: %s" % e)
                continue

    return jsonify({'message': 'Businesses updated successfully'}), 201




@actions.route('/add_business', methods=['POST'])
def add_business():
    data = request.get_json()
    if isinstance(data, list):
        data = data[-1]
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
    
    biz_uid = new_business.uid
    new_metrics = Metrics(
        business_uid=biz_uid,
        cashflow=data.get('cashflow'),
        ask_price=data.get('ask_price'),
        gross_revenue=data.get('gross_revenue'),
        ebitda=data.get('ebitda'),
        valuation=data.get('valuation'),
        revenue=data.get('revenue'),
        sector=data.get('sector'),
        geography=data.get('geography'),
        scale=data.get('scale'),
        advantages=data.get('advantages'),
        investor=data.get('investor'),
        multiple=data.get('multiple')
    )
    db.session.add(new_metrics)
    db.session.commit()

    return jsonify({'message': 'Business added successfully'}), 201


def _map_data_to_deal_box(data: dict) -> dict:
    return {
        'name': data.get('name'),
        'valuation_low': float(data.get('valuation').split('-')[0]),
        'valuation_high': float(data.get('valuation').split('-')[1]),
        'revenue_low': float(data.get('gross_revenue').split('-')[0]),
        'revenue_high': float(data.get('gross_revenue').split('-')[1]),
        'cashflow_low': float(data.get('cashflow').split('-')[0]),
        'cashflow_high': float(data.get('cashflow').split('-')[1]),
        'ask_price_low': float(data.get('ask_price').split('-')[0]),
        'margin': float(data.get('margin')),
        'sector': data.get('sector').split(';'),
        'advantages': data.get('advantages').split(';'),
        'multiple_low': float(data.get('multiple').split('-')[0]),
        'multiple_high': float(data.get('multiple').split('-')[1]),
        'geography': data.get('geography').split(';')
    }


@actions.route('/add_deal_box', methods=['POST'])
def add_deal_box():
    data = request.get_json()
    if isinstance(data, list):
        data = data[-1]
    adjusted_data = _map_data_to_deal_box(data)
    required_fields = (
        'name', 
        'valuation_low', 
        'valuation_high', 
        'revenue_low', 
        'revenue_high'
    )
    validate_required_fields(adjusted_data, required_fields)

    new_deal_box = DealBox(
        name=adjusted_data.get('name'),
        valuation_low=adjusted_data.get('valuation_low'),
        valuation_high=adjusted_data.get('valuation_high'),
        revenue_low=adjusted_data.get('revenue_low'),
        revenue_high=adjusted_data.get('revenue_high'),
        cashflow_low=adjusted_data.get('cashflow_low'),
        cashflow_high=adjusted_data.get('cashflow_high'),
        ask_price_low=adjusted_data.get('ask_price_low'),
        ask_price_high=adjusted_data.get('ask_price_high'),
        margin=adjusted_data.get('margin'),
        sector=adjusted_data.get('sector'),
        advantages=adjusted_data.get('advantages'),
        multiple_low=adjusted_data.get('multiple_low'),
        multiple_high=adjusted_data.get('multiple_high'),
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



