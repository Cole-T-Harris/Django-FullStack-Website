import requests
import base64
from . import Credentials
from django.core.cache import cache
import logging

BASE_KROGER_URL = "https://api.kroger.com/v1/"
KROGER_LOCATIONS_CACHE_KEY = 'kroger_stores_token'
KROGER_PRODUCTS_CACHE_KEY = 'kroger_products_token'
SCOPE = {KROGER_LOCATIONS_CACHE_KEY: '', KROGER_PRODUCTS_CACHE_KEY: 'product.compact'}
CACHE_KEYS = {"locations": KROGER_LOCATIONS_CACHE_KEY, "products": KROGER_PRODUCTS_CACHE_KEY}
LOGGER = logging.getLogger(__name__)

def get_access_token(token_cache_key, session):
    token = cache.get(token_cache_key)
    if not token:
        # Define the OAuth 2.0 authentication parameters
        credentials = Credentials.kroger_credentials()
        client_id = credentials["client_id"]
        client_secret = credentials["client_secret"]
        credentials_string = f"{client_id}:{client_secret}"
        encoded_credentials = base64.b64encode(credentials_string.encode("utf-8")).decode("utf-8")
        auth_headers = {
            'Accept': 'application/json; charset=utf-8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": f"Basic {encoded_credentials}"
        }
        auth_params = {
            "grant_type": "client_credentials",
            "scope": SCOPE[token_cache_key]
        }
        response = session.post(BASE_KROGER_URL + "connect/oauth2/token", data=auth_params, headers=auth_headers)
        if response.status_code == 200:
            LOGGER.info("Got new token")
            token = response.json()['access_token']
            cache.set(token_cache_key, token, response.json()['expires_in'])
        else:
            return None
    return {'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive', 
            'Authorization': f'Bearer {token}',
            'Cache-Control': 'no-chache'}

def make_api_request(type, request):
    #initialize a session for a request
    session = requests.Session()

    url = BASE_KROGER_URL + type + "?"
    for filter_type, filter_value in request.items():
        if not isinstance(filter_value, str):
            filter_value = str(filter_value)
        url += "filter." + filter_type + "=" + filter_value + "&"
    url = url[:-1]
    authorization = get_access_token(CACHE_KEYS[type], session)
    response = session.get(url, headers=authorization)
    session.close()
    if response.status_code == 200:
        return response
    else:
        return None
