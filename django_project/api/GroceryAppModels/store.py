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

class WeekDayHours(dict):
    def __init__(self, open, close):
        self.open = open
        self.close = close
        dict.__init__(self, open=open, close=close)

class WeekHours(dict):
    def __init__(self, monday, tuesday, wednesday, thursday, friday, saturday, sunday):
        self.monday = monday
        self.tuesday = tuesday
        self.wednesday = wednesday
        self.thursday = thursday
        self.friday = friday
        self.saturday = saturday
        self.sunday = sunday
        dict.__init__(self, monday=monday, tuesday=tuesday, wednesday=wednesday, thursday=thursday, friday=friday, saturday=saturday, sunday=sunday)

class Store(dict):
    def __init__(self, location_id, chain, name, address, geolocation, thumbnail, hours):
        self.location_id = location_id
        self.chain = chain
        self.name = name
        self.address = address
        self.geolocation = geolocation
        self.thumbnail = thumbnail
        self.hours = hours
        dict.__init__(self,location_id=location_id, chain=chain, name=name, address=address, geolocation=geolocation, thumbnail=thumbnail, hours=hours)

    def __str__(self):
        return self.name
