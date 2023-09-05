from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError, HttpResponse
import json
import logging
from .GroceryAppModels import locations_request, products_request

VALID_LOCATIONS_KEYS = {"zipCode.near", "radiusInMiles", "limit"}
VALID_PRODUCTS_KEYS = {"term", "locationId", "start", "limit"}
REQUESTTYPE_PARAMS = {"locations": VALID_LOCATIONS_KEYS, "products": VALID_PRODUCTS_KEYS}
LOGGER = logging.getLogger(__name__)

def validate_get_request(request_data, request_type):
    if request_type not in REQUESTTYPE_PARAMS:
        raise ValueError
    for key in request_data:
        if key not in REQUESTTYPE_PARAMS[request_type]:
            raise ValueError

def build_json_response(request, type, build_response):
        try:
            data = {}
            for key, value in request.GET.items():
                data[key] = value
            validate_get_request(data, type)
            LOGGER.info(data)
            response = build_response(data)
        except json.JSONDecodeError:
            LOGGER.error('Invalid JSON data')
            return HttpResponseBadRequest('Invalid JSON data')
        except IOError as IOe:
            LOGGER.error(str(IOe))
            return HttpResponseServerError("Server Error")
        except ValueError:
            error = "Incorrect key values entered for requestType: " + type
            LOGGER.error(error)
            return HttpResponseBadRequest("Invalid GET request." + error)
        if response:
            return JsonResponse(response, safe=False)
        else:
            LOGGER.error("The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.")
            return HttpResponseServerError("The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.")


def locations_response(request):
    if request.method == "GET":
        return build_json_response(request, type='locations', build_response = locations_request.build_response)
    
def products_response(request):
    if request.method == "GET":
        return build_json_response(request, type='products', build_response=products_request.build_response)