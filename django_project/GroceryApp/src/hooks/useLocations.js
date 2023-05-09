import React, { useEffect, useState } from "react";
import { getOriginalServerUrl, sendGETAPIRequest } from "../utils/restfulAPI";
import { LOCATIONS_LIMIT, LOG, ZIPCODE_REGEX } from "../utils/constants";
import { Location } from "../models/location.model";

export function useLocations(zipCode, radiusInMiles) {
    const [locations, setLocations] = useState([])
    const storeAPIInfo = {
        zipCode, radiusInMiles,
        stores: locations, setLocations: setLocations
    }
    useEffect(() => {
        if (ZIPCODE_REGEX.test(zipCode)) {
            makeStoreAPIRequest(storeAPIInfo)
        }
    }, [zipCode, radiusInMiles])

    return {locations: locations, setLocations: setLocations}
}

async function makeStoreAPIRequest(info) {
    const requestBody = { requestType: "locations", 
                          "zipCode.near": info.zipCode, 
                          radiusInMiles: info.radiusInMiles,
                          limit: LOCATIONS_LIMIT}
    const locationsResponse = await sendGETAPIRequest(requestBody, getOriginalServerUrl())

    if (locationsResponse) {
        info.setLocations(makeLocationsList(locationsResponse))
    }
    else {
        LOG.error(`Locations request to ${getOriginalServerUrl()} failed. Check the log for more details.`, "error")
    }
}

function makeLocationsList(locationsResponse) {
    let locations = [];
    for (let index in locationsResponse.stores) {
        let location = locationsResponse.stores[index]
        locations.push(new Location(location))
    }
    return locations
}