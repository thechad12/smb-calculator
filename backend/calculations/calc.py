from database.models.metrics import Metrics
from database.models.business import Business
from database.models.deal_box import DealBox
import uuid


from main import db

def _get_biz_metrics(uid) -> dict:
    result = db.session.query(Metrics).filter_by(
        Metrics.business_uid == uid
    ).first()
    if result is not None:
        return result.as_dict
    return {
        'results': 0
    }


def _get_deal_box_by_name(str_name) -> dict:
    result = db.session.query(DealBox).filter_by(
        DealBox.name == str_name
    ).first()
    if result is not None:
        return result.as_dict
    return {
        'results': 0
    }


def comp_to_deal_box(
        box_name: str, 
        biz_uid: uuid.UUID = None, 
        biz_name: str = None) -> dict:
    box = _get_deal_box_by_name(box_name)
    if biz_uid is None:
        biz_uid = db.session.query(Business).filter_by(
            Business.name == biz_name
        ).first()
    if biz_name is None:
        biz_name = db.session.query(Business).filter_by(
            Business.uid == biz_uid
        ).first()
    metrics = _get_biz_metrics(biz_uid)
    data = {
        'deal_box': box,
        biz_name: metrics,
    }
    return data

