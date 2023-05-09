from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError, HttpResponse
import json
import os
import jsonschema
import logging
from .GroceryAppModels import locations_request

VALID_LOCATIONS_KEYS = {"zipCode.near", "radiusInMiles", "limit"}
REQUESTTYPE_PARAMS = {"locations": VALID_LOCATIONS_KEYS}

def validate_GET(request_data, request_type):
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
            validate_GET(data, type)
            logging.info(data)
            response = build_response(data)
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON data')
        except IOError as IOe:
            logging.error(str(IOe))
            return HttpResponseServerError("Server Error")
        except ValueError:
            error = "Incorrect key values entered for requestType: " + type
            logging.error(error)
            return HttpResponseBadRequest("Invalid GET request." + error)
        if response:
            return JsonResponse(response, safe=False)
        else:
            return HttpResponseServerError("The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.")


def locations_response(request):
    if request.method == "GET":
        return build_json_response(request, type='locations', build_response = locations_request.build_response)