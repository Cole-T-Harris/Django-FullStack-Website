import React, { useState } from 'react'
import Collapse from 'react-bootstrap/Collapse'
import StorePicker from './Stores/StorePicker'
import List from './List/List'
import Container from 'react-bootstrap/esm/Container'
import Header from './header/header'

export default function App() {
  const [showList, setShowList] = useState(false)
  const [groceryListNumber, setGroceryListNumber] = useState(0)
  const [storeName, setStoreName] = useState("Example Name")
  const [storeID, setStoreID] = useState("")
  const context = {
    showList, setShowList,
    groceryListNumber, setGroceryListNumber,
    storeName, setStoreName,
    storeID, setStoreID
  }
  return (
    <>
      <Header {...context}/>
      <Planner {...context}/>
    </>
  )
}

function Planner(props) {
  return (
    <div className='body'>
      <Collapse in={!props.showList}>
        <Container>
          <StorePicker {...props} />
        </Container>
      </Collapse>
      <Collapse in={props.showList}>
        <Container>
          <List {...props} />
        </Container>
      </Collapse>
    </div>
  )
}