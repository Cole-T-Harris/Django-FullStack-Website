import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Fab } from 'react-tiny-fab'
import ItemSearchModal from './ItemSearchModal'
import {FaSearchPlus} from "react-icons/fa"
import { FAB_STYLING, ACCENT_COLOR } from '../../utils/constants'
import EmptyListIcon from '../../static/images/empty_data_icon.svg'

export default function List(props) {
  if (props.storeID) {
    return (
      <>
        <GroceryListPlanner {...props}/>
        <Fab
          mainButtonStyles={FAB_STYLING}
          icon={<FaSearchPlus/>}
          text='Add Item'
          onClick={() => props.setShowItemSearch(true)}
        >
        </Fab>
      </>
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
      <GroceryListTable {...props}/>
      <ItemSearchModal {...props}/>
    </div>
  )
}

function GroceryListTable(props) {
  if (props.groceryList.length === 0) {
    return (
      <div>
        <h2>Grocery List is Empty</h2>
        <p>To add items to list, select the <FaSearchPlus style={{color: ACCENT_COLOR}}/> button</p>
        <img src={EmptyListIcon} />
      </div>
    )
  }
}