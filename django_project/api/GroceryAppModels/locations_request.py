from .store import Store, Address, Geolocation, WeekDayHours, WeekHours
from .external_api_request import make_api_request
from ..models import StoreThumbnail
import pgeocode
import geopy.distance

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
            location_hours_data = location["hours"]
            location_hours = WeekHours(WeekDayHours(location_hours_data["monday"]["open"], location_hours_data["monday"]["close"]),
                                       WeekDayHours(location_hours_data["tuesday"]["open"], location_hours_data["tuesday"]["close"]),
                                       WeekDayHours(location_hours_data["wednesday"]["open"], location_hours_data["wednesday"]["close"]),
                                       WeekDayHours(location_hours_data["thursday"]["open"], location_hours_data["thursday"]["close"]),
                                       WeekDayHours(location_hours_data["friday"]["open"], location_hours_data["friday"]["close"]),
                                       WeekDayHours(location_hours_data["saturday"]["open"], location_hours_data["saturday"]["close"]),
                                       WeekDayHours(location_hours_data["sunday"]["open"], location_hours_data["sunday"]["close"]))
            current_location = Store(location["locationId"],
                                location["chain"],
                                location["name"],
                                location_address,
                                location_geolocation,
                                get_store_thumbnail(location["chain"]),
                                location_hours)
            locations.append(current_location.__dict__)
        response["stores"] = locations
        response["distances"] = get_distances(locations, response["zipCode.near"])
        return response
    else:
        return None

def get_store_thumbnail(branch):
    query_result = StoreThumbnail.objects.filter(branch = branch)
    if len(query_result) < 1:
        return StoreThumbnail.objects.filter(branch = "KROGER")[0].thumbnail
    return query_result[0].thumbnail

def get_distances(locations, zipcode):
    nomi = pgeocode.Nominatim('us')
    zipcode_latlong_dataframe = nomi.query_postal_code(zipcode)[['latitude','longitude']]
    starting_coordinates = (zipcode_latlong_dataframe['latitude'], zipcode_latlong_dataframe['longitude'])
    distances = []
    for store in locations:
        store_coordinates = (store["geolocation"]["latitude"], store["geolocation"]["longitude"])
        distances.append(geopy.distance.geodesic(starting_coordinates, store_coordinates).miles)
    return distances

    