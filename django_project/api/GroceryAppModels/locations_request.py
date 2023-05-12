from .store import Store, Address, Geolocation
from .external_api_request import make_api_request
from ..models import StoreThumbnail

def build_response(request):
    response = request
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
            location_geolocation_data = location["geolocation"]
            location_geolocation = Geolocation(location_geolocation_data["latitude"],
                                               location_geolocation_data["longitude"])
            current_location = Store(location["locationId"],
                                location["chain"],
                                location["name"],
                                location_address,
                                location_geolocation,
                                get_store_thumbnail(location["chain"]))
            locations.append(current_location.__dict__)
        response["stores"] = locations
        return response
    else:
        return None

def get_store_thumbnail(branch):
    query_result = StoreThumbnail.objects.filter(branch = branch)
    if len(query_result) < 1:
        return StoreThumbnail.objects.filter(branch = "KROGER")[0].thumbnail
    return query_result[0].thumbnail
    