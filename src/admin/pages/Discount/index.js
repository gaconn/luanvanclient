import React from 'react'
import AddCampaign from './AddCampaign';
import ListDiscount from './ListDiscount';

const Discount = ({option}) => {
    switch (option) {
        case 'list':
            return <ListDiscount />
        case 'add':
            return <AddCampaign />
        default:
            break;
    }
  return (
    <div>Discount</div>
  )
}

export default Discount