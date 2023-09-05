import React, { useState } from "react";
import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useItems } from "../../hooks/useItems";

export default function ItemSearchModal(props) {
    const handleClose = () => props.setShowItemSearch(false)
    const [searchPressed, setSearchPressed] = useState(false)
    const [itemSearchTerm, setItemSearchTerm] = useState("")
    const {items, setItems, totalResults, loading} = useItems(props.storeID, itemSearchTerm, 0, searchPressed)
    console.log(items, totalResults, loading)
    return (
        <Modal 
            show={props.showItemSearch}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                Search Items @ {props.storeName}
            </Modal.Header>
            <Modal.Body>
                <GroceryListSearch term={itemSearchTerm} setTerm={setItemSearchTerm} />
            </Modal.Body>
            <Modal.Footer>
                <Button
                onClick={() => setSearchPressed(!searchPressed)}
                >
                    Search
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

function GroceryListSearch(props) {
    return (
        <InputGroup>
            <Form.Control
            placeholder='Search For Items'
            onChange={(e) => props.setTerm(e.target.value)}
            value={props.itemSearchTerm}
            />
        </InputGroup>
    )
}

function ItemSearchResultsTable(props) {

}