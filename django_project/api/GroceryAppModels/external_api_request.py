import requests
import datetime
from . import Credentials
from django.core.cache import cache

BASE_KROGER_URL = "https://api.kroger.com/v1/"
KROGER_LOCATIONS_CACHE_KEY = 'kroger_stores_token'
SCOPE = {KROGER_LOCATIONS_CACHE_KEY: ''}
CACHE_KEYS = {"locations": KROGER_LOCATIONS_CACHE_KEY}

def get_access_token(token_cache_key):
    token = cache.get(token_cache_key)
    if not token:
        # Define the OAuth 2.0 authentication parameters
        credentials = Credentials.kroger_credentials()
        auth_params = {
            "client_id": credentials["client_id"],
            "client_secret": credentials["client_secret"],
            "grant_type": "client_credentials",
            "scope": SCOPE[token_cache_key]
        }
        response = requests.post(BASE_KROGER_URL + "connect/oauth2/token", data=auth_params)
        if response.status_code == 200:
            token = response.json()['access_token']
            cache.set(token_cache_key, token, response.json()['expires_in'])
        else:
            return None
    return {'Accept': 'application/json', 'Authorization': 'Bearer {}'.format(token)}

def make_api_request(type, filters):
    url = BASE_KROGER_URL + type + "?"
    for filter_type, filter_value in filters.items():
        if not isinstance(filter_value, str):
            filter_value = str(filter_value)
        url += "filter." + filter_type + "=" + filter_value + "&"
    url = url[:-1]
    authorization = get_access_token(CACHE_KEYS[type])
    response = requests.get(url, headers=authorization)
    if response.status_code == 200:
        return response
    else:
        return None