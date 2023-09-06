class Product(dict):
    productId=""
    aisleLocations = ""
    brand = ""
    countryOrigin = ""
    description = ""
    images = ""
    stock = ""
    prices = ""
    size = ""
    priceSize = ""
    def __init__(self,
                 productId, 
                 aisleLocations, 
                 brand, 
                 countryOfOrigin, 
                 description, 
                 images, 
                 stock, 
                 prices, 
                 size, 
                 priceSize):
        self.aisleLocations = aisleLocations
        self.brand = brand
        self.countryOrigin = countryOfOrigin
        self.description = description
        self.images = images
        self.stock = stock
        self.prices = prices
        self.size = size
        self.priceSize = priceSize
        dict.__init__(self, productId=productId, aisleLocations=aisleLocations, brand=brand, countryOfOrigin=countryOfOrigin, description=description, images=images, stock=stock, prices=prices, size=size, priceSize=priceSize)

class Product_Images(dict):
    thumbnail = ""
    frontImage = ""
    backImage = ""
    rightImage = ""
    leftImage = ""
    def __init__(self, thumbnail, frontImage, backImage, rightImage, leftImage):
        self.thumbnail = thumbnail
        self.frontImage = frontImage
        self.backImage = backImage
        self.rightImage = rightImage
        self.leftImage = leftImage
        dict.__init__(self, thumbnail=thumbnail, frontImage=frontImage, backImage=backImage, rightImage=rightImage, leftImage=leftImage)

class Product_Price(dict):
    price = 0
    promo = 0
    def __init__(self, price, promo):
        self.price = price
        self.promo = promo
        dict.__init__(self, price=price, promo=promo)

        