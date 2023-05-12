import React, { useState } from 'react'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import { useLocations } from '../../hooks/useLocations'
import { Map, Marker } from "pigeon-maps"
import { capitalizeFirstLetter } from '../../utils/modifiers'

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
      <Table responsive hover className='stores-table'>
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
  const [toggleRow, setToggleRow] = useState(false)
  return (
    <>
      <tr className='table-spacer'><td className='non-hoverable-row'></td></tr>
      <tr className='table-store-data hoverable-row' onClick={() => setToggleRow(!toggleRow)}>
        <td>
          <Table className='stores-row-table'>
            <tbody>
              <tr>
                <td>
                  <img src={props.location.thumbnail}/> <strong>{props.location.name}</strong>
                  <div>
                    1 miles
                  </div>
                </td>
                <td className='store-right-column'>
                  <Button variant='light' onClick={() => props.setStoreID(props.location.locationID)}>Shop Here</Button>
                  <Button variant='link' size="sm" onClick={() => setToggleRow(!toggleRow)}>Store Details</Button>
                </td>
              </tr>
              <StoreAdditionalInformation {...props} toggleRow={toggleRow}/>
            </tbody>
          </Table>
        </td>
      </tr>
    </>
  )
}

function StoreAdditionalInformation(props) {
  return (
    <tr>
      <td colSpan={2}>
        <Collapse in={props.toggleRow}>
          <div>
            <StoreLocation {...props}/>
            <strong>{props.location.streetAddress}</strong>
            <StoreHours {...props}/>
          </div>
        </Collapse>
      </td>
    </tr>
  )
}

function StoreLocation(props) {
  const position = [51.505, -0.09]
  return (
    <Map height={175} defaultCenter={position} defaultZoom={15}>
        <Marker width={28} anchor={position} />
    </Map>
  )
}

function StoreHours(props) {
  const hours = {
    monday: {
      open: "06:00",
      close: "23:00"
    },
    tuesday: {
      open: "06:00",
      close: "23:00"
    },
    wednesday: {
      open: "06:00",
      close: "23:00"
    },
    thursday: {
      open: "06:00",
      close: "23:00"
    },
    friday: {
      open: "06:00",
      close: "23:00"
    },
    saturday: {
      open: "06:00",
      close: "23:00"
    },
    sunday: {
      open: "06:00",
      close: "23:00"
    }
  }
  const dateList = []
  for (const day in hours) {
    dateList.push(
      capitalizeFirstLetter(day) + " " + convert24HrTo12HrTime(hours[day].open) + " - " + convert24HrTo12HrTime(hours[day].close)
    )
  }
  return (
    <>
      {dateList.map((weekdayHours, index) =>
        <div key={weekdayHours}>{weekdayHours}</div>
      )}
    </>
  )
}

function convert24HrTo12HrTime(time) {
  const timeString12hr = new Date('1970-01-01T' + time + 'Z')
  .toLocaleTimeString('en-US',
    {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
  );
  return timeString12hr
}