import React from 'react'
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/config'
import {Logout} from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    authService.Logout()
    .then=()=>{
        dispatch(Logout())
    }
  return (
    <>
    <div className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
        Logout
    </div>
    </>
  )
}

export default LogoutBtn