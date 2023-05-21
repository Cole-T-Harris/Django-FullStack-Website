import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import ItemSearchModal from './ItemSearchModal'

export default function List(props) {
  if (props.storeID) {
    return (
      <GroceryListPlanner {...props}/>
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
      <Button variant='light' onClick={() => props.setShowItemSearch(true)}>Add Item</Button>
      <ItemSearchModal {...props}/>
    </div>
  )
}