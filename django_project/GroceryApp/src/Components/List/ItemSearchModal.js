import React from "react";
import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {FaSearchPlus} from "react-icons/fa"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            <Modal.Footer>
                <Button>
                    Search
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

function GroceryListSearch(props) {
    return (
        <Container>
            <Row>
                <Col>
                    <InputGroup>
                        <Form.Control
                        placeholder='Search For Items'
                        />
                        <Button variant='light'>
                        <FaSearchPlus/>
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    )
  }