import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/employeeDashboard/Sidebar'
import Navbar from '../components/employeeDashboard/Navbar'

const EmployeeDashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 ml-64 bg-gray-100 min-h-screen'>
        <Navbar />
        <div className='mt-12 p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard