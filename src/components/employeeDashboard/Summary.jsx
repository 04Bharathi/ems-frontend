import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { FaUser } from 'react-icons/fa'
const Summary = () => {
    const {user} = useAuth()
  return (
    <div className='rounded flex bg-white'>
      <div className={`text-3xl flex justify-center bg-teal-600 items-center text-white px-4`}>
        <FaUser />
      </div>
      <div className='pl-4 py-1'>
        <p className='text-lg font-semibold font-sans'>Welcome Back</p>
        <p className='text-xl font-bold font-serif'>{user.name}</p>
      </div>
    </div>
  )
}

export default Summary
