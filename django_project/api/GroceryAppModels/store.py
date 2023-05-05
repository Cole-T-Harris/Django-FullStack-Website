from django.db import models

class Address():
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

    def __str__(self):
        return self.streetAddress + ", " + self.city + ", " + self.state + ", " + self.zipcode

class Store():
    location_id = ""
    chain = ""
    name = ""
    address = Address("","","","","")

    def __init__(self, location_id, chain, name, address):
        self.location_id = location_id
        self.chain = chain
        self.name = name
        self.address = address

    def __str__(self):
        return self.name
