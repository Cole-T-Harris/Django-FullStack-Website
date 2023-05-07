from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError, HttpResponse
import json
import os
import jsonschema
import logging
from .GroceryAppModels import locations_request

def json_validate(request_data, request_type):
    base_schemas_folder = os.path.abspath(os.path.dirname(os.path.abspath(__file__))) + '/schemas/'
    schema_path = base_schemas_folder + request_type + "Request.json"
    try:
        schema = json.load(open(schema_path))
        jsonschema.validate(request_data, schema)
    except:
        raise

def build_json_response(request, type, build_response):
        if request.method == "GET":
            try:
                data = json.loads(request.body)
                json_validate(data, type)
                logging.info(data)
                response = build_response(data)
            except json.JSONDecodeError:
                return HttpResponseBadRequest('Invalid JSON data')
            except IOError as IOe:
                logging.error(str(IOe))
                return HttpResponseServerError("Server Error")
            except jsonschema.ValidationError as e:
                error = e.schema["error_msg"] if "error_msg" in e.schema else e.message
                logging.error(error)
                return HttpResponseBadRequest("Invalid JSON data. Does not match API schema: " + error)
            if response:
                return JsonResponse(response, safe=False)
            else:
                return HttpResponseServerError("The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.")


def locations_response(request):
    if request.method == "GET":
        return build_json_response(request, type='locations', build_response = locations_request.build_response)