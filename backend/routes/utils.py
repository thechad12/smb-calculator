from flask import g, json, request
from typing import Union


def get_json():
    """
    get request json data
    """
    if hasattr(request, 'json') and request.json is not None:
        return request.json
    if hasattr(request, 'data') and request.data is not None:
        return json.loads(request.data)
    return dict()


def get_params():
    """
    helper to get params from a request
    """
    if not g.get('params'):
        params = get_json()
        g.params = params
    return g.params


def validate_required_fields(data: Union[list, dict], fields: tuple, allow_recovery: bool=True):
    if isinstance(data, list):
        for entry in data:
            if not all(key in entry for key in fields):
                print("not all required fields are entered: ")
                print("entry: %s" % str(entry))
                print("required fields: %s" % str(fields))
                if not allow_recovery:
                    return False
    else:
        if not all(key in data.keys() for key in fields):
            print("not all required fields are entered: ")
            print("required fields: %s" % str(fields))
            if not allow_recovery:
                return False
    return True