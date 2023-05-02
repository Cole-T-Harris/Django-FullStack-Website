import React, { useState } from 'react'
import Collapse from 'react-bootstrap/Collapse'
import StorePicker from './Stores/StorePicker'
import List from './List/List'
import Container from 'react-bootstrap/esm/Container'

export default function App() {
  const [showList, setShowList] = useState(false)
  const [groceryListNumber, setGroceryListNumber] = useState(0)
  const [storeName, setStoreName] = useState("Example Name")
  const context = {
    showList, setShowList,
    groceryListNumber, setGroceryListNumber,
    storeName, setStoreName
  }
  return (
    <div className='body'>
      <Collapse in={!showList}>
        <Container>
          <StorePicker {...context} />
        </Container>
      </Collapse>
      <Collapse in={showList}>
        <Container>
          <List {...context} />
        </Container>
      </Collapse>
    </div>
  )
}