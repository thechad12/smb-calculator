import json
import calculations.calc as calc
from flask import Blueprint, request, jsonify
from database.models.business import Business
from database.models.deal_box import DealBox
from database.models.metrics import Metrics
from main import db
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import delete
from routes.utils import validate_required_fields
from main import db, celery
from jobs.scraper import scrape_business_info
from config import Config

actions = Blueprint('actions', __name__)

DATABASE_URL = Config.SQLALCHEMY_DATABASE_URI
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

@actions.route('/scrape', methods=['POST'])
def scrape():
    data = request.json
    url = data.get('url')
    
    if not url:
        return jsonify({"error": "URL is required"}), 400
    
    # Delay the task to Celery
    task = scrape_task.delay(url)
    return jsonify({"task_id": task.id}), 202


@celery.task(name='actions.scrape_task')
def scrape_task(url):
    # Perform scraping here and save to the database
    business = scrape_business_info(url)
    return {"message": f"Added business: {business.name}"}
    

@actions.route('/delete_businesses', methods=['POST'])
def delete_businesses():
    data = request.json
    business_uids = data.get('business_uids')
    
    if not business_uids or not isinstance(business_uids, list):
        return jsonify({"error": "A list of business UIDs is required"}), 400

    task = delete_businesses_task.delay(business_uids)
    return jsonify({"task_id": task.id}), 202


@celery.task(name='actions.delete_businesses_task')
def delete_businesses_task(business_uids):
    try:
        session = db.create_scoped_session()
        session.execute(
            delete(Business).where(Business.uid.in_(business_uids))
        )
        session.commit()
        return {"message": "Businesses successfully deleted"}
    except Exception as e:
        session.rollback()
        return {"error": str(e)}

    
@actions.route('/update_businesses', methods=['POST'])
def update_businesses():
    data = request.get_json()
    task = update_businesses_task.delay(data)
    return jsonify({'task_id': task.id}), 202


@celery.task(name='actions.update_businesses_task')
def update_businesses_task(data):
    session = db.create_scoped_session()
    try:
        for row in data:
            business = session.query(Business).filter(
                Business.uid == row.get('uid')
            ).first()
            metrics = session.query(Metrics).filter(
                Metrics.business_uid == row.get('uid')
            ).first()

            investor = True

            if not metrics:
                metrics = Metrics(
                    business_uid=row.get('uid'),
                    cashflow=row.get('cashflow'),
                    ask_price=row.get('ask_price'),
                    gross_revenue=row.get('gross_revenue'),
                    revenue=row.get('gross_revenue'),
                    ebitda=row.get('ebitda'),
                    valuation=row.get('valuation'),
                    sector=row.get('sector'),
                    geography=row.get('geography'),
                    scale=1,
                    advantages=row.get('advantages'),
                    investor=investor,
                    multiple=row.get('multiple')
                )
                session.add(metrics)

            if business:
                for key, value in row.items():
                    if key != 'uid':
                        if hasattr(business, key):
                            setattr(business, key, value)
                        if hasattr(metrics, key):
                            setattr(metrics, key, value)
            session.commit()
        return {'message': 'Businesses updated successfully'}
    except Exception as e:
        session.rollback()
        return {'error': str(e)}



@actions.route('/add_business', methods=['POST'])
def add_business():
    data = request.get_json()
    task = add_business_task.delay(data)
    return jsonify({'task_id': task.id}), 202


@celery.task(name='actions.add_business_task')
def add_business_task(data):
    session = db.create_scoped_session()
    try:
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
        session.add(new_business)
        session.commit()
        
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
        session.add(new_metrics)
        session.commit()

        return {'message': 'Business added successfully'}
    except Exception as e:
        session.rollback()
        return {'error': str(e)}


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
    task = add_deal_box_task.delay(data)
    return jsonify({'task_id': task.id}), 202


@celery.task(name='actions.add_deal_box_task')
def add_deal_box_task(data):
    session = db.create_scoped_session()
    try:
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
        session.add(new_deal_box)
        session.commit()

        return {'message': 'Deal Box added successfully'}
    except Exception as e:
        session.rollback()
        return {'error': str(e)}


@actions.route('/add_business_metrics', methods=['POST'])
def add_business_metrics():
    data = request.get_json()
    task = add_business_metrics_task.delay(data)
    return jsonify({'task_id': task.id}), 202


@celery.task(name='actions.add_business_metrics_task')
def add_business_metrics_task(data):
    session = db.create_scoped_session()
    try:
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
        business = session.query(Business).filter(
            Business.name == data['business_name']
        ).first()
        if not business:
            return {'error': 'Business does not exist'}
        
        data['business_uid'] = business.uid
        validate_required_fields(data, required_fields)

        new_metrics = Metrics(**data)
        session.add(new_metrics)
        session.commit()

        return {'message': 'Business Metrics added successfully'}
    except Exception as e:
        session.rollback()
        return {'error': str(e)}



