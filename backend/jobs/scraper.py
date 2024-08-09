import requests
from bs4 import BeautifulSoup
from celery import shared_task
from sqlalchemy.orm import sessionmaker
from database.models.business import Business
from database.models.metrics import Metrics
from config import Config
from sqlalchemy import create_engine

# Database setup
DATABASE_URL = Config.SQLALCHEMY_DATABASE_URI
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def parse_bizbuysell(soup):
    data = {}
    data['cashflow'] = soup.select_one('.cashflow-selector').text.strip()
    data['sde'] = soup.select_one('.sde-selector').text.strip()
    data['revenue'] = soup.select_one('.revenue-selector').text.strip()
    data['profit_margin'] = soup.select_one('.profit-margin-selector').text.strip()
    data['multiple'] = soup.select_one('.multiple-selector').text.strip()
    data['location'] = soup.select_one('.location-selector').text.strip()
    return data

def parse_flippa(soup):
    data = {}
    data['cashflow'] = soup.select_one('.cashflow-selector').text.strip()
    data['sde'] = soup.select_one('.sde-selector').text.strip()
    data['revenue'] = soup.select_one('.revenue-selector').text.strip()
    data['profit_margin'] = soup.select_one('.profit-margin-selector').text.strip()
    data['multiple'] = soup.select_one('.multiple-selector').text.strip()
    data['location'] = soup.select_one('.location-selector').text.strip()
    return data

def parse_apollo(soup):
    data = {}
    data['cashflow'] = soup.select_one('.cashflow-selector').text.strip()
    data['sde'] = soup.select_one('.sde-selector').text.strip()
    data['revenue'] = soup.select_one('.revenue-selector').text.strip()
    data['profit_margin'] = soup.select_one('.profit-margin-selector').text.strip()
    data['multiple'] = soup.select_one('.multiple-selector').text.strip()
    data['location'] = soup.select_one('.location-selector').text.strip()
    return data

@shared_task
def scrape_business_info(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    if 'bizbuysell.com' in url:
        data = parse_bizbuysell(soup)
    elif 'flippa.com' in url:
        data = parse_flippa(soup)
    elif 'apollo.io' in url:
        data = parse_apollo(soup)
    else:
        raise ValueError("Unsupported site")

    db_session = SessionLocal()
    try:
        business = Business(
            name='Business Name',
            location=data.get('location', ''),
            description='',
            biz_type=''
        )
        db_session.add(business)
        db_session.flush()

        metrics = Metrics(
            business_uid=business.uid,
            cashflow=data.get('cashflow', 0.0),
            ask_price=0.0,
            gross_revenue=data.get('revenue', 0.0),
            ebitda=0.0,
            valuation=0.0,
            revenue=data.get('revenue', 0.0),
            sector='',
            geography='',
            scale=1,
            advantages=[],
            investor=False,
            multiple=data.get('multiple', 0.0)
        )
        db_session.add(metrics)
        db_session.commit()

        return business.serialize
    except Exception as e:
        db_session.rollback()
        raise e
    finally:
        db_session.close()
