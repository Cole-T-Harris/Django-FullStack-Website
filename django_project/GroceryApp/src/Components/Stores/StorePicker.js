import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import "react-icons/fa"
import { useLocations } from '../../hooks/useLocations'

export default function StorePicker(props) {
  const [zipCode, setZipCode] = useState("")
  const [radius, setRadius] = useState(10)
  const {locations, setLocations} = useLocations(zipCode, radius)
  const locationProps = {
    zipCode, setZipCode,
    radius, setRadius,
    locations, setLocations
  }
  return (
    <div className='store-search-page'>
      <StoreFinderForm {...locationProps}/>
    </div>
)}

function StoreFinderForm(props) {
  return (
    <div className="store-input-width">
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
