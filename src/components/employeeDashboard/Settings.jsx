import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { changePassword } from '../../services/settingsService'

const Settings = () => {

  const navigate = useNavigate()
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    userId: user._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    const {name, value} = e.target; 
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await changePassword(formData)
        console.log(response)

        if (response.data.success) {
            setError("")
            if (user.role === "admin") {
              navigate("/admin-dashboard")
            } else {
              navigate("/employee-dashboard")
            }
            
        }
    } catch(e) {
        console.log(e.response)
        setError(e.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Change Password
          </h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            {error && <p className='text-center text-red-500'>{error}</p>}
            
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name='oldPassword'
              onChange={handleChange}
              value={formData.oldPassword}
              placeholder="Enter current password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
            
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name='newPassword'
              onChange={handleChange}
              value={formData.newPassword}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name='confirmPassword'
              onChange={handleChange}
              value={formData.confirmPassword}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
          >
            Change Password
          </button>

        </form>
      </div>
    </div>
  )
}

export default Settings

