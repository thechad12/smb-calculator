import json
import calculations.calc as calc
from flask import Blueprint
from routes.utils import get_params


bp = Blueprint('data', __name__)


@bp.route('/comp_deal_box')
def comp_deal_box():
    params = get_params()
    deal_box_name = params.get('deal_box')
    data = calc.deal_boxes(deal_box_name)
    return json.dumps(data)


@bp.route('/get_businesses')
def get_businesses():
    params = get_params()
    data = calc.get_all_businesses()
    return json.dumps(data)


@bp.route('/get_business_metrics/<string:business_uid')
def get_business_metrics(business_uid):
    data = calc.get_bussiness_metrics(business_uid)
    return json.dumps(data)


@bp.route('/get_deal_boxes')
def get_deal_boxes():
    data = calc.get_deal_boxes()
    return json.dumps(data)