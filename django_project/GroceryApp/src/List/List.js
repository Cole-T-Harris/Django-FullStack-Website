import React from 'react'
import Button from 'react-bootstrap/Button'

export default function List(props) {
    return (
      <div className='store-search-page'>
        <p>The list contains {props.groceryListNumber} items.</p>
        <Button 
          variant='dark'
          onClick={ () => props.setShowList(!props.showList)}
        >
          Change View
        </Button>
      </div>
  )}