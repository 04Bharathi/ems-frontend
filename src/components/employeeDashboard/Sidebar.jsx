import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers
} from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
    const {user} = useAuth()
    console.log(user._id)
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 w-64 z-40'>
      <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h3 className='text-2xl font-bold text-white'>Employee MS</h3>
      </div>

      <div className='px-4 py-2 space-y-2'>
        <NavLink
          to="/employee-dashboard"
          end
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center gap-4 px-4 py-2.5 rounded`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center gap-4 px-4 py-2.5 rounded`
          }
        >
          <FaUsers />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center gap-4 px-4 py-2.5 rounded`
          }
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center gap-4 px-4 py-2.5 rounded`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/settings"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : ""} flex items-center gap-4 px-4 py-2.5 rounded`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar