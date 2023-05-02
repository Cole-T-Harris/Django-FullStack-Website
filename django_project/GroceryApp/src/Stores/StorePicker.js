import React from 'react'
import Button from 'react-bootstrap/Button'

export default function StorePicker(props) {
    return (
      <div className='store-search-page'>
        <p>The selected store is: {props.storeName}</p>
        <Button 
          variant='dark'
          onClick={ () => props.setShowList(!props.showList)}
        >
          Change View
        </Button>
      </div>
  )}