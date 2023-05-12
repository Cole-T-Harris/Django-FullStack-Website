class Address(dict):
    street_address = ""
    city = ""
    state = ""
    zipcode = ""
    county = ""

    def __init__(self, street_address, city, state, zipcode, county):
        self.street_address = street_address
        self.city = city
        self.state = state
        self.zipcode = zipcode
        self.county = county
        dict.__init__(self, street_address=street_address, city=city, state=state, zipcode=zipcode, county=county)

    def __str__(self):
        return self.streetAddress + ", " + self.city + ", " + self.state + ", " + self.zipcode

class Geolocation(dict):
    def __init__(self, latitude, longitude):
        self.latitude = latitude
        self.longitude = longitude
        dict.__init__(self, latitude=latitude, longitude=longitude)

class Store(dict):
    def __init__(self, location_id, chain, name, address, geolocation, thumbnail):
        self.location_id = location_id
        self.chain = chain
        self.name = name
        self.address = address
        self.geolocation = geolocation
        self.thumbnail = thumbnail
        dict.__init__(self,location_id=location_id, chain=chain, name=name, address=address, geolocation=geolocation, thumbnail=thumbnail)

    def __str__(self):
        return self.name
