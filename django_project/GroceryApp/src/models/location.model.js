export class Location {
    constructor(locationObj) {
        this.locationID = locationObj.location_id
        this.chain = locationObj.chain
        this.name = locationObj.name
        this.streetAddress = locationObj.address.street_address
        this.city = locationObj.address.city
        this.state = locationObj.address.state
        this.zipcode = locationObj.address.zipcode
        this.county = locationObj.address.county
        this.thumbnail = locationObj.thumbnail
    }
}