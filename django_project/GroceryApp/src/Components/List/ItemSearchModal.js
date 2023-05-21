import React from "react";
import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {FaSearchPlus} from "react-icons/fa"

export default function ItemSearchModal(props) {
    const handleClose = () => props.setShowItemSearch(false)
    return (
        <Modal 
            show={props.showItemSearch}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                Search Items @ {props.storeName}
            </Modal.Header>
            <Modal.Body>
                <GroceryListSearch {...props} />
            </Modal.Body>
        </Modal>
    )
}

function GroceryListSearch(props) {
    return (
    <InputGroup>
        <Form.Control
        placeholder='Search For Items'
        />
        <Button variant='light'>
        <FaSearchPlus/>
        </Button>
    </InputGroup>
    )
  }