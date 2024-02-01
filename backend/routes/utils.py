from flask import g, json, request


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