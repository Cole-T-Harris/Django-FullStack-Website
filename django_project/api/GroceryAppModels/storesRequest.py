from .store import Store, Address
import json

def buildResponse(request):
    groceryJSON = {
                        "data": [
                            {
                                "locationId": "62000005",
                                "chain": "KINGSOOPERS",
                                "address": {
                                    "addressLine1": "1355 Krameria St",
                                    "city": "Denver",
                                    "state": "CO",
                                    "zipCode": "80220",
                                    "county": "DENVER COUNTY"
                                },
                                "geolocation": {
                                    "latitude": 39.7376325,
                                    "longitude": -104.9176554,
                                    "latLng": "39.7376325,-104.9176554"
                                },
                                "name": "King Soopers - MAYFAIR",
                                "hours": {
                                    "timezone": "America/Denver",
                                    "gmtOffset": "(UTC-07:00) Mountain Time (US Canada)",
                                    "open24": false,
                                    "monday": {
                                        "open": "06:00",
                                        "close": "23:00",
                                        "open24": false
                                    },
                                    "tuesday": {
                                        "open": "06:00",
                                        "close": "23:00",
                                        "open24": false
                                    },
                                    "wednesday": {
                                        "open": "06:00",
                                        "close": "23:00",
                                        "open24": false
                                    },
                                    "thursday": {
                                        "open": "06:00",
                                        "close": "23:00",
                                        "open24": false
                                    },
                                    "friday": {
                                        "open": "06:00",
                                        "close": "23:00",
                                        "open24": false
                                    },
                                    "saturday": {
                                        "open": "06:00",
                                        "close": "23:00",
                                        "open24": false
                                    },
                                    "sunday": {
                                        "open": "06:00",
                                        "close": "23:00",
                                        "open24": false
                                    }
                                },
                                "phone": "3033991086",
                                "departments": [
                                    {
                                        "departmentId": "48",
                                        "name": "Starbucks"
                                    },
                                    {
                                        "departmentId": "50",
                                        "name": "Olive Bar"
                                    },
                                    {
                                        "departmentId": "01",
                                        "name": "Deli"
                                    },
                                    {
                                        "departmentId": "05",
                                        "name": "Seafood Department"
                                    },
                                    {
                                        "departmentId": "0K",
                                        "name": "Full Strength Beer"
                                    },
                                    {
                                        "departmentId": "LY",
                                        "name": "Lottery Tickets"
                                    },
                                    {
                                        "departmentId": "02",
                                        "name": "Bakery"
                                    },
                                    {
                                        "departmentId": "53",
                                        "name": "Boar's Head"
                                    },
                                    {
                                        "departmentId": "58",
                                        "name": "Free Wireless Access"
                                    },
                                    {
                                        "departmentId": "23",
                                        "name": "Drug & General Merchandise"
                                    },
                                    {
                                        "departmentId": "29",
                                        "name": "Event Tickets"
                                    },
                                    {
                                        "departmentId": "31",
                                        "name": "Coin Star"
                                    },
                                    {
                                        "departmentId": "60",
                                        "name": "Red Box"
                                    },
                                    {
                                        "departmentId": "65",
                                        "name": "Money Services"
                                    },
                                    {
                                        "departmentId": "04",
                                        "name": "Meat Department"
                                    },
                                    {
                                        "departmentId": "08",
                                        "name": "Floral"
                                    },
                                    {
                                        "departmentId": "09",
                                        "name": "Pharmacy",
                                        "phone": "3033881689",
                                        "hours": {
                                            "open24": false,
                                            "monday": {
                                                "open": "09:00",
                                                "close": "20:00",
                                                "open24": false
                                            },
                                            "tuesday": {
                                                "open": "09:00",
                                                "close": "20:00",
                                                "open24": false
                                            },
                                            "wednesday": {
                                                "open": "09:00",
                                                "close": "20:00",
                                                "open24": false
                                            },
                                            "thursday": {
                                                "open": "09:00",
                                                "close": "20:00",
                                                "open24": false
                                            },
                                            "friday": {
                                                "open": "09:00",
                                                "close": "20:00",
                                                "open24": false
                                            },
                                            "saturday": {
                                                "open": "09:00",
                                                "close": "18:00",
                                                "open24": false
                                            },
                                            "sunday": {
                                                "open": "10:00",
                                                "close": "17:00",
                                                "open24": false
                                            }
                                        }
                                    },
                                    {
                                        "departmentId": "66",
                                        "name": "Murray's Cheese"
                                    },
                                    {
                                        "departmentId": "69",
                                        "name": "Online Deli/Bakery Ordering"
                                    },
                                    {
                                        "departmentId": "94",
                                        "name": "Pickup"
                                    },
                                    {
                                        "departmentId": "21",
                                        "name": "Self Checkout"
                                    },
                                    {
                                        "departmentId": "55",
                                        "name": "Atm"
                                    },
                                    {
                                        "departmentId": "63",
                                        "name": "I-wireless"
                                    }
                                ]
                            }
                        ],
                        "meta": {
                            "pagination": {
                                "start": 1,
                                "limit": 1,
                                "total": 1
                            }
                        }
                    }
    stores_data = groceryJSON['data']
    