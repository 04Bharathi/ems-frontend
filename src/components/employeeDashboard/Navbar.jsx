import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <div className='fixed top-0 left-64 right-0 h-12 bg-teal-600 px-4 flex items-center justify-between z-50'>
      <p className='text-white'>Welcome {user?.name}</p>

      <button
        onClick={logout}
        className='bg-teal-700 px-3 py-1 rounded text-white hover:bg-teal-800'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar