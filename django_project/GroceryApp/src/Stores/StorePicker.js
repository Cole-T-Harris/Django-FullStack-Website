import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "react-icons/fa"

export default function StorePicker(props) {
  const [zipCode, setZipCode] = useState("")
  return (
    <div className='store-search-page'>
      <p>The selected store is: {props.storeName}</p>
      <p>The entered zip code is {zipCode}</p>
      <StoreFinderForm zipCode={zipCode} setZipCode={setZipCode}/>
      <Button 
        variant='dark'
        onClick={ () => props.setShowList(!props.showList)}
      >
        Cancel
      </Button>
    </div>
)}

function StoreFinderForm(props) {
  return (
    <div class="store-input-width">
      <Form>
        <Form.Group className='mb-3'>
          <Form.Control 
            type="search"
            placeholder='Enter your zipcode'
            value={props.zipCode}
            onChange={(input) => props.setZipCode(input.target.value)}
          />
          <Form.Text className="text-muted">
            Search for grocery stores near your zipcode.
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  )
}
