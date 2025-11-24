import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

const Profile = () => {
    const {user}= useContext(UserContext)
    if(!user) return <h2>Please login to view profile</h2>
    return <div>Welcome {user.username}</div>
}

export default Profile