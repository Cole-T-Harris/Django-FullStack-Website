import { useEffect, useState } from "react";
import { getOriginalServerUrl, sendGETAPIRequest } from "../utils/restfulAPI";
import { ITEMS_LIMIT, LOG } from "../utils/constants";
import { Item } from "../models/item.model";

export function useItems(storeID, term, offset, searchForItems) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const itemAPIInfo = {
        storeID, term, offset,
        items, setItems,
        loading, setLoading
    }
    useEffect(() => {
        makeItemAPIRequest(itemAPIInfo)
    }, [searchForItems])

    return {items, setItems, loading}
}

async function makeItemAPIRequest(info) {
    const requestBody = { requestType: "items", 
                          storeID: info.storeID, 
                          term: info.term,
                          start: info.offset,
                          radiusInMiles: info.radiusInMiles,
                          limit: ITEMS_LIMIT}
    info.setLoading(true)
    const itemsResponse = await sendGETAPIRequest(requestBody, getOriginalServerUrl())
    if (itemsResponse) {
        info.setItems(makeItemsList(itemsResponse))
    }
    else {
        LOG.error(`Items request to ${getOriginalServerUrl()} failed. Check the log for more details.`, "error")
    }
    info.setLoading(false)
}

function makeItemsList(itemsResponse) {
    let items = [];
    for (let index in itemsResponse.items) {
        let location = itemsResponse.items[index]
        items.push(new Item(location))
    }
    return items
}