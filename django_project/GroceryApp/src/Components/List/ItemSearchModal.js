import React, { useState } from "react";
import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useItems } from "../../hooks/useItems";
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { Loading } from '../../utils/constants'

export default function ItemSearchModal(props) {
    const handleClose = () => props.setShowItemSearch(false)
    const [searchPressed, setSearchPressed] = useState(false)
    const [itemSearchTerm, setItemSearchTerm] = useState("")
    const itemsResponse = useItems(props.storeID, itemSearchTerm, 0, searchPressed)
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
                <ItemSearchResultsTable {...itemsResponse} />
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
    if (props.loading) {
        return (
            <Loading/>
        )
    }
    return(
        <Table striped>
            <thead></thead>
            <tbody>
                {props.items.map((product, index) => (
                    <ItemSearchResultsTableRow
                        product={product}
                        key={`table-${JSON.stringify(product)}`}
                    />
                ))}
            </tbody>
        </Table>
    )
}

function ItemSearchResultsTableRow(props) {
    const product = props.product
    return (
        <tr>
            <td>
                <Button 
                    variant="secondary"
                    size="sm"
                >Add
                </Button>
                <ItemStockLevel stock={product.stock}/>
            </td>
            <td>
                <Image src={product?.thumbnail} />
            </td>
            <td>
                {product?.description}
            </td>
            <td>
                <ItemDisplayPrice price={product.price} promo={product.promo} priceSize={product.priceSize}/>
            </td>
        </tr>
    )
}

function ItemDisplayPrice(props) {
    if (props.promo > 0) {
        return (
            <p>
                <del style={{color: "red"}}>${props.price}</del>
                <span style={{color: "red"}}>${props.promo}</span>
                / {props.priceSize}
            </p>
        )
    }
    if (props.price > 0) {
        return (
            <p>${props.price} / {props.priceSize}</p>
        )
    }
    return (
        <p>-</p>
    )
}

function ItemStockLevel(props) {
    if (props.stock == "HIGH") {
        return (
            <span style={{color: "green"}}> In Stock</span>
        )
    }
    if (props.stock == "LOW") {
        return (
            <span style={{color: "orange"}}> Low Stock</span>
        )
    }
    if (props.stock == "TEMPORARILY_OUT_OF_STOCK") {
        return (
            <span style={{color: "red"}}> Out of Stock</span>
        )
    }
    return (
        <p></p>
    )
}