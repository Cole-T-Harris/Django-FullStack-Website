from .store import Store, Address
from .external_api_request import make_api_request

def build_response(request):
    response = {
        "requestType": request['requestType'],
        "zipCode.near": request['zipCode.near'],
        "radiusInMiles": request['radiusInMiles'], 
        "limit": request['limit']
    }
    locations = []
    locations_response = make_api_request("locations", response)
    if locations_response:
        locations_data = locations_response.json()['data']
        for location in locations_data:
            location_address_data = location["address"]
            location_address = Address(location_address_data["addressLine1"],
                                    location_address_data["city"],
                                    location_address_data["state"],
                                    location_address_data["zipCode"],
                                    location_address_data["county"])
            current_location = Store(location["locationId"],
                                location["chain"],
                                location["name"],
                                location_address)
            locations.append(current_location.__dict__)
        response["stores"] = locations
        return response
    else:
        return None
    