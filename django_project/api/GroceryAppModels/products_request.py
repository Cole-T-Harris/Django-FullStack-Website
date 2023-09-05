from .external_api_request import make_api_request
from .product import Product, Product_Images, Product_Price
import logging

LOGGER = logging.getLogger(__name__)

def build_response(request):
    products = []
    products_response = make_api_request("products", request)
    response = request
    if products_response:
        for product in products_response.json()["data"]:
            product_images_array = product["images"]
            product_images = build_product_images(product_images_array)
            product_prices = Product_Price(product["items"][0]["price"]["regular"], 
                                           product["items"][0]["price"]["promo"])
            product_object = Product(product.get("aisleLocations", []),
                                     product.get("brand", ""),
                                     product.get("countryOrigin", ""),
                                     product.get("description", ""),
                                     product_images,
                                     product.get("items", [{}])[0].get("inventory", {}).get("stockLevel", ""),
                                     product_prices,
                                     product.get("items", [{}])[0].get("size", ""),
                                     product.get("items", [{}])[0].get("soldBy", ""))
            products.append(product_object)
        response["products"] = products
        response["meta"] = products_response.json()["meta"]
    return response

def build_product_images(image_array):
    def get_image_perspective(image):
        return image["perspective"]
    def get_index_of_medium_image(images):
        if len(images) == 5:
            return 2
        else:
            for i in range(len(images)):
                if images[i]["size"] == "medium":
                    return i
            return 0
    def get_index_of_thumbnail_image(images):
        if len(images) == 5:
            return 4
        else:
            for i in range(len(images)):
                if images[i]["size"] == "thumbnail":
                    return i
            return -1
    def get_image_url(image, index):
        return image["sizes"][index]["url"]
    thumbnail = ""
    front_image = ""
    back_image = ""
    left_image = ""
    right_image = ""
    for image in image_array:
        if get_image_perspective(image) == "front":
            front_image = get_image_url(image, get_index_of_medium_image(image["sizes"]))
            thumbnail_index = get_index_of_thumbnail_image(image["sizes"])
            thumbnail = get_image_url(image, thumbnail_index) if thumbnail_index >= 0 else ""
        elif get_image_perspective(image) == "back":
            back_image = get_image_url(image, get_index_of_medium_image(image["sizes"]))
        elif get_image_perspective(image) == "right":
            right_image = get_image_url(image, get_index_of_medium_image(image["sizes"]))
        elif get_image_perspective(image) == "left":
            left_image = get_image_url(image, get_index_of_medium_image(image["sizes"]))
    return Product_Images(thumbnail, front_image, back_image, right_image, left_image)