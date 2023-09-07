import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Fab } from 'react-tiny-fab'
import ItemSearchModal, { ItemAdditionButton, ItemDisplayPrice } from './ItemSearchModal'
import {FaChevronDown, FaSearchPlus, FaTrashAlt} from "react-icons/fa"
import { FAB_STYLING, ACCENT_COLOR } from '../../utils/constants'
import EmptyListIcon from '../../static/images/empty_data_icon.svg'
import Table from 'react-bootstrap/esm/Table'
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

export default function List(props) {
  if (props.storeID) {
    return (
      <>
        <GroceryListPlanner {...props}/>
        <Fab
          mainButtonStyles={FAB_STYLING}
          icon={<FaSearchPlus/>}
          text='Add Item'
          onClick={() => props.setShowItemSearch(true)}
        >
        </Fab>
      </>
    )
  }
  return (
    <div className='store-search-page'>
      Store must be selected before building a grocery list.
      <br></br>
      <Button 
        variant = "light"
        onClick={() => props.setShowList(!props.showList)}
      >
        Select Store
      </Button>
    </div>
  )
}

function GroceryListPlanner(props) {
  return (
    <div className='store-search-page'>
      <GroceryListTable {...props}/>
      <ItemSearchModal {...props}/>
      <Row>
        <GroceryListSubTotal groceryList={props.groceryList}/>
      </Row>
    </div>
  )
}

function GroceryListTable(props) {
  if (props.groceryList.length === 0) {
    return (
      <div>
        <h2>Grocery List is Empty</h2>
        <p>To add items to list, select the <FaSearchPlus style={{color: ACCENT_COLOR}}/> button</p>
        <img src={EmptyListIcon} />
      </div>
    )
  }
  return (
    <Table hover className='rounded-table'>
      <GroceryListTableHeader/>
      <tbody>
        {props.groceryList.map((product) => (
          <GroceryListTableRow key={product.productId} product={product} groceryList={props.groceryList} setGroceryList={props.setGroceryList} />
        ))}
      </tbody>
    </Table>
  )
}

function GroceryListTableHeader() {
  return (
    <thead className='grocery-list-header'>
      <tr>
        <th>
          <strong>Qty</strong>
        </th>
        <th>
          <strong>Item</strong>
        </th>
        <th>
        </th>
        <th>
          <strong>Price</strong>
        </th>
        <th>
        </th>
      </tr>
    </thead>
  )
}

function GroceryListTableRow(props) {
  const handleDelete = () => {
    const filteredList = props.groceryList.filter(
      (item) => item.productId !== props.product.productId
    );
    props.setGroceryList(filteredList)
  }
  return (
    <>
      <tr className='table-spacer'><td className='non-hoverable-row'></td></tr>
      <tr className='hoverable-row'>
        <td>
          <ItemAdditionButton product={props.product} groceryList={props.groceryList} setGroceryList={props.setGroceryList}/>
        </td>
        <td>
          <Image src={props.product?.thumbnail} className="product-thumbnail-size"/>
        </td>
        <td style={{width: "100%"}}>
          {props.product?.description}
        </td>
        <td>
          <ItemDisplayPrice price={props.product?.price} promo={props.product?.promo} priceSize={props.product?.priceSize}/>
        </td>
        <td style={{textAlign: "right"}}>
          <FaChevronDown />
        </td>
      </tr>
    </>
  )
}

function GroceryListSubTotal(props) {
  const initialSum = 0
  const subTotal = props.groceryList.reduce((accumulator, currentProduct) => {
    if (currentProduct.promo > 0)
      return accumulator + currentProduct.promo * currentProduct.quantity
    if (currentProduct.price > 0)
      return accumulator + currentProduct.price * currentProduct.quantity
    return accumulator
  }, initialSum)
  return (
    <h3 style={{textAlign: "right"}}>
      Subtotal ${subTotal.toFixed(2)}
    </h3>
  )
}