import json
import calculations.calc as calc
from flask import Blueprint, request, jsonify
from database.models.business import Business
from database.models.deal_box import DealBox
from database.models.metrics import Metrics
from main import db

actions = Blueprint('actions', __name__)

@actions.route('/add_business', methods=['POST'])
def add_business():
    data = request.get_json()

    # Validate the incoming data
    if not all(key in data for key in ('name', 'location', 'description', 'biz_type')):
        return jsonify({'error': 'Missing required fields'}), 400

    new_business = Business(**data)
    db.session.add(new_business)
    db.session.commit()

    return jsonify({'message': 'Business added successfully'}), 201


@actions.route('/add_deal_box', methods=['POST'])
def add_deal_box():
    data = request.get_json()

    # Validate the incoming data
    if not all(key in data for key in ('name', 'valuation_low', 'valuation_high', 'revenue_low', 'revenue_high')):
        return jsonify({'error': 'Missing required fields'}), 400

    new_deal_box = DealBox(**data)
    db.session.add(new_deal_box)
    db.session.commit()

    return jsonify({'message': 'Deal Box added successfully'}), 201


@actions.route('/add_business_metrics', methods=['POST'])
def add_business_metrics():
    data = request.get_json()

    # Validate the incoming data
    if not all(key in data for key in ('business_uid', 'cashflow', 'ask_price', 'gross_revenue', 'ebitda', 'valuation', 'revenue', 'sector', 'geography', 'scale', 'advantages', 'investor', 'multiple')):
        return jsonify({'error': 'Missing required fields'}), 400


    new_metrics = Metrics(**{**data})
    db.session.add(new_metrics)
    db.session.commit()

    return jsonify({'message': 'Business Metrics added successfully'}), 201



