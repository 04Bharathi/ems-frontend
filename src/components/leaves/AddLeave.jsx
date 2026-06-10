import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { requestLeave } from '../../services/leaveServices'

const AddLeave = () => {

    const navigate = useNavigate()

    const {user} = useAuth()

    const [leave, setLeave] = useState({
        userId: user._id, 
    })

    const handleChange = (e) => {
        const {name, value} = e.target; 
        setLeave({...leave, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(leave)
        try {
          const response = await requestLeave(leave)
          if (response.data.success) {
            navigate(-1)
          }
        } catch(e) {
          console.log(e.response)
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-teal-600 px-8 py-5">
          <h2 className="text-3xl font-bold text-white">
            Request Leave
          </h2>
          <p className="text-teal-100 mt-1">
            Submit your leave request for approval
          </p>
        </div>

        {/* Form */}
        <form className="p-8" onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Leave Type */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                Leave Type
                </label>
                <select
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                name='leaveType'
                onChange={handleChange}
                >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                </select>
            </div>

            {/* From Date */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                From Date
                </label>
                <input
                required
                name='startDate'
                onChange={handleChange}
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
            </div>

            {/* To Date */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                To Date
                </label>
                <input
                required
                name='endDate'
                onChange={handleChange}
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reason for Leave
                </label>
                <textarea
                required
                name='reason'
                onChange={handleChange}
                rows="5"
                placeholder="Enter leave reason..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
            </div>

</div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition"
            >
              Submit Request
            </button>

          </div>

        </form>
      </div>
    </div>
  )
}

export default AddLeave