import React from 'react'
import ListUser from './ListUser';
import UpdateUser from './UpdateUser';

const User = ({option}) => {
    switch (option) {
        case 'list':
            return <ListUser />    
        case 'update':
            return <UpdateUser />
        default:
            break;
    }
  return (
    <div>User</div>
  )
}

export default User