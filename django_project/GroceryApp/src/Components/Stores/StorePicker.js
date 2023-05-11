import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
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
    invalidZipCode,
    storeID: props.storeID, setStoreID: props.setStoreID
  }
  return (
    <div className='store-search-page'>
      <StoreFinderForm {...locationProps}/>
      <StoreResultsTable {...locationProps}/>
    </div>
)}

function StoreFinderForm(props) {
  return (
    <div className="store-element-width store-input-style">
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

function StoreResultsTable(props) {
  return (
    <div className='store-element-width store-table-styling'>
      <Table responsive hover>
        <tbody>
          {props.locations.map((location, index) => (
            <StoreResultsRow
              {...props}
              key = {`table-${JSON.stringify(location)}`}
              location = {location}
              index = {index}
            />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

function StoreResultsRow(props) {
  return (
    <>
      <tr className='table-spacer'><td className='non-hoverable-row'></td></tr>
      <tr className='table-store-data hoverable-row'>
        <td>
          <img src={props.location.thumbnail}/> {props.location.name}
          <div>
            1 miles
          </div>
        </td>
        <td className='store-right-column'>
          <Button variant='light' onClick={() => props.setStoreID(props.location.locationID)}>Shop Here</Button>
        </td>
      </tr>
    </>
  )
}