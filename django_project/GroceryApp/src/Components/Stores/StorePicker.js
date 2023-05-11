import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputGroup from 'react-bootstrap/InputGroup'
import "react-icons/fa"
import { useLocations } from '../../hooks/useLocations'

export default function StorePicker(props) {
  const [zipCode, setZipCode] = useState("")
  const [radius, setRadius] = useState(50)
  const {locations, setLocations, invalidZipCode} = useLocations(zipCode, radius)
  const locationProps = {
    zipCode, setZipCode,
    radius, setRadius,
    locations, setLocations,
    invalidZipCode
  }
  return (
    <div className='store-search-page'>
      <StoreFinderForm {...locationProps}/>
    </div>
)}

function StoreFinderForm(props) {
  return (
    <div className="store-input-width">
      <InputGroup hasValidation>
        <Form.Control 
          type="search"
          placeholder='Enter your zipcode'
          value={props.zipCode}
          onChange={(input) => props.setZipCode(input.target.value)}
          isInvalid={props.invalidZipCode}
        >
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please enter a valid 5 digit zipcode.
        </Form.Control.Feedback>
      </InputGroup>
      <StoreRadiusFilter {...props}/>
    </div>
  )
}

function StoreRadiusFilter(props) {
  const dropDownLabel = props.radius + "miles"
  const handleSelect = (eventKey) => {
    props.setRadius(eventKey)
  }
  return (
    <>
      Seach Within
        <DropdownButton
        variant="light"
        title={dropDownLabel}
        size="sm"
        onSelect={handleSelect}
      >
        <Dropdown.Item eventKey={5}>5 miles</Dropdown.Item>
        <Dropdown.Item eventKey={10}>10 miles</Dropdown.Item>
        <Dropdown.Item eventKey={15}>15 miles</Dropdown.Item>
        <Dropdown.Item eventKey={25}>25 miles</Dropdown.Item>
        <Dropdown.Item eventKey={50}>50 miles</Dropdown.Item>
      </DropdownButton>
    </>
  )
}