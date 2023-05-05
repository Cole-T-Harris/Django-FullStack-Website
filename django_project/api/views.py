from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
import json
import os
import jsonschema
import logging
from .GroceryAppModels.store import Store, Address

def json_validate(request_data, requestType):
    base_schemas_folder = os.path.abspath(os.path.dirname(os.path.abspath(__file__))) + '/schemas/'
    schema_path = base_schemas_folder + requestType + "Request.json"
    try:
        schema = json.load(open(schema_path))
        jsonschema.validate(request_data, schema)
    except:
        raise
        

def stores_request(request):
    if request.method == "GET":
        try:
            data = json.loads(request.body)
            json_validate(data, 'stores')
            logging.info(data)
            response = {
                "requestType": data['requestType'],
                "near": data['near'],
                "radius": data['radius'], 
                "limit": data['limit']
            }
        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON data')
        except IOError as IOe:
            logging.error(str(IOe))
            return HttpResponseServerError("Server Error")
        except jsonschema.ValidationError as e:
            error = e.schema["error_msg"] if "error_msg" in e.schema else e.message
            logging.error(error)
            return HttpResponseBadRequest("Invalid JSON data. Does not match API schema: " + error)
    
        return JsonResponse(response, safe=False)