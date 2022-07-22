import React from 'react'
import Detail from './Detail'
import ListOrder from "./ListOrder"
const Order = ({option}) => {


    switch (option) {
        case 'list':
            return <ListOrder />
        case 'detail': 
            return <Detail />
        default:
            break;
    }
  return (
    <div>Order</div>
  )
}

export default Order