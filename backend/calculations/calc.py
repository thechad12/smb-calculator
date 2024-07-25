from database.models.metrics import Metrics
from database.models.business import Business
from database.models.deal_box import DealBox
import uuid

from main import db
from collections import defaultdict


def _get_biz_metrics(uid) -> dict:
    result = db.session.query(Metrics).filter(
        Metrics.business_uid == uid
    ).first()
    if result is not None:
        return result.serialize
    return None


def _get_deal_box_by_name(str_name: str=None) -> dict:
    if str_name:
        result = db.session.query(DealBox).filter(
            DealBox.name == str_name
        ).first()
    else:
        result = db.session.query(DealBox).first()
    if result is not None:
        return result.serialize
    return None


def get_business_metrics(business_uid: str) -> dict:
    metrics = _get_biz_metrics(business_uid)
    return metrics



def get_all_businesses() -> list:
    data = []
    businesses = [biz for biz in db.session.query(Business).all()]
    for biz in businesses:
        metric_data = _get_biz_metrics(biz.uid)
        data.append({**biz.serialize, **metric_data})
    return data


def comp_to_deal_box(
        box_name: str, 
        biz_uid: uuid.UUID = None, 
        biz_name: str = None) -> dict:
    box = _get_deal_box_by_name(str_name=box_name)
    if biz_uid is None:
        biz_uid = db.session.query(Business).filter(
            Business.name == biz_name
        ).first()
    if biz_name is None:
        biz_name = db.session.query(Business).filter(
            Business.uid == biz_uid
        ).first()
    metrics = _get_biz_metrics(biz_uid)
    data = {
        'deal_box': box,
        biz_name: metrics,
    }
    return data


def deal_boxes(box_name: str) -> dict:
    businesses = db.session.query(Business).all()
    deal_box = _get_deal_box_by_name(box_name)
    deal_box_data = {}
    deal_box_data = deal_box
    business_data = []
    for biz in businesses:
        metrics = _get_biz_metrics(biz.uid)
        if metrics is not None:
            biz_data = {}
            for key, value in metrics.items():
                biz_data[key] = value
            biz_data['business_name'] = biz.name
            business_data.append(biz_data)
    return [deal_box_data, {'businesses': business_data}]


def get_deal_boxes() -> list:
    deal_boxes = db.session.query(DealBox).all()
    return [deal_box.serialize for deal_box in deal_boxes]


def get_business(business_uid: str) -> dict:
    business = db.session.query(Business).filter(
        Business.uid == business_uid
    ).one()
    if business:
        return business.serialize
    else:
        return {}

