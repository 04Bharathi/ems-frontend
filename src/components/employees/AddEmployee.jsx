import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

import {IoClose} from 'react-icons/io5'
import { addEmployee, getDepartmentList } from '../../services/employeeServices'

const AddEmployee = ({closeModal, refreshEmployee}) => {
    const [formData, setFormData] = useState({})
    const [department, setDepartment] = useState([])

    useEffect(() => {
        const getDepartments = async() => {
            const departments = await getDepartmentList()
            setDepartment(departments || [])
        }
        getDepartments()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })

        try {
            const response = await addEmployee(formDataObj, token)
            console.log(response)
            closeModal(false)
            refreshEmployee()
        } catch(e){
            console.log(e.response.data)
        }
    }

    const handleChange = (e) => {
        const {name, value, files} = e.target 
        if (name === "image") {
            setFormData({...formData, [name]: files[0]})
        } else {
            setFormData({...formData, [name]: value})
        }
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white w-[700px] max-w-[95%] rounded-lg p-6 relative'>
            <button className='absolute top-2 right-3 flex items-center justify-center h-8 w-8 text-xl font-bold rounded-full hover:bg-red-500 hover:text-white' onClick={closeModal}>
                <IoClose />
            </button>
            <h2 className='text-xl font-bold'>Add Employee</h2>
            
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 max-h-[70vh] overflow-auto pr-2'>
                <div>
                    <label htmlFor='name' className='mb-2 font-medium'>Name</label>
                    <input 
                    className='w-full border border-gray-300 mt-1 p-1 rounded-md focus:ring-2 focus:ring-teal-500' 
                    type='text' 
                    name='name'
                    required
                    onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='email' className='mb-2 font-medium'>Email</label> <br/>
                    <input 
                    className='w-full border border-gray-300 mt-1 p-1 rounded-md focus:ring-2 focus:ring-teal-500'
                    type='email' 
                    name='email' 
                    required
                    onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='emlpoyeeId' className='mb-2 font-medium'>Employee ID</label> <br/>
                    <input 
                    className='w-full border border-gray-300 mt-1 p-1 rounded-md focus:ring-2 focus:ring-teal-500'
                    type='text' 
                    name='employeeId'
                    required
                    onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='dob' className='mb-2 font-medium'>Date of Birth</label> <br/>
                    <input
                    className='w-full border border-gray-300 mt-1 p-1 rounded-md focus:ring-2 focus:ring-teal-500'
                    type='date' 
                    required
                    name='dob'
                    onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='password' className='mb-2 font-medium'>Password</label>
                    <input 
                    type='password'
                    required
                    className='w-full border border-gray-300 mt-1 p-1 rounded-md focus:ring-2 focus:ring-teal-500'
                    name='password'
                    onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='designation' className='mb-2 font-medium'>Designation</label> <br/>
                    <input 
                    className='w-full border border-gray-300 mt-1 p-1 rounded-md focus:ring-2 focus:ring-teal-500'
                    type='text' 
                    required
                    name='designation'
                    onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='department' className='mb-2 font-medium'>Department</label> <br />
                    <select 
                    className='w-full border border-gray-300 mt-1 p-2 rounded-md focus:ring-2 focus:ring-teal-500'
                    name="department"
                    required
                    onChange={handleChange}>
                        <option value="">Select Department</option>
                        {department.map(dep => (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor='role' className='mb-2 font-medium'>Role</label> <br />
                    <select 
                    className='w-full border border-gray-300 mt-1 p-2 rounded-md focus:ring-2 focus:ring-teal-500'
                    name="role"
                    required
                    onChange={handleChange} >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='salary' className='mb-2 font-medium'>Salary</label>
                    <input 
                    className='w-full border border-gray-300 mt-1 p-1 rounded-md focus:ring-2 focus:ring-teal-500'
                    type='number' 
                    required
                    name='salary'
                    onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='gender' className='mb-2 font-medium'>Gender</label> <br />
                    <select
                    className='w-full border border-gray-300 mt-1 p-2 rounded-md focus:ring-2 focus:ring-teal-500'
                    name="gender"
                    required
                    onChange={handleChange} >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='gender' className='mb-2 font-medium'>Marital Status</label> <br />
                    <select
                    className='w-full border border-gray-300 mt-1 p-2 rounded-md focus:ring-2 focus:ring-teal-500'
                    name="maritalStatus"
                    required
                    onChange={handleChange} >
                        <option value="">Select Status</option>
                        <option value="married">Married</option>
                        <option value="single">Single</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='image' className='mb-2 font-medium'>Upload Image</label>
                    <input 
                    type='file' 
                    name='image'
                    className='w-full border border-gray-300 mt-1 p-1 rounded-md focus:ring-2 focus:ring-teal-500'
                    onChange={handleChange} />
                </div>
                <div className='md:col-span-2 flex'>
                    <button
                    type='submit'
                    className='bg-teal-600 justify-end hover:bg-teal-700 text-white px-4 py-2 rounded-md font-medium transition'>
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddEmployee
