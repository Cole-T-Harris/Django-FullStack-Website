export class Item {
    constructor(itemObj) {
        this.aisleLocations = itemObj.aisleLocations
        this.brand = itemObj.brand
        this.countryOrigin = itemObj.countryOrigin
        this.description = itemObj.description
        this.thumbnail = itemObj.thumbnail
        this.frontImage = itemObj.frontImage
        this.backImage = itemObj.backImage
        this.stock = itemObj.stock
        this.price = itemObj.price
        this.promo = itemObj.promo
        this.size = itemObj.size
        this.priceSize = itemObj.priceSize
    }
}