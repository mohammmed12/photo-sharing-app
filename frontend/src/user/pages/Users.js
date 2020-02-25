import React from 'react'
import UsersList from '../components/UsersList'
 const Users = () => {
    const USERS = [
        {id: 'u1', name: 'sarah  momo', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT6kA0I1mErps49GVKmj08ARYv2uvGMc3-aswjDhP-AuE52ZrrA', places: 3}
    ]; 
    
    
    return (
        <UsersList items={USERS} />
    )
}

export default Users;