import React, { useState, useEffect } from 'react'
import { IoClose } from "react-icons/io5";
import { addDepartmentApi, updateDepartmentApi } from '../../services/addDepartmentService';

const AddDepartment = ({refreshDepartment, closeModal, editDepartment, setEditDepartment}) => {

    const [department, setDepartment] = useState({
        dep_name: "", 
        description: ""
    })

    useEffect(() => {
        if(editDepartment) {
            setDepartment({
                dep_name: editDepartment.dep_name || "", 
                description: editDepartment.description || ""
            })
        }
    }, [editDepartment])

    const handleChange = (e) => {
        const {name, value} = e.target
        setDepartment({...department, [name]: value})
    }

    const handleSubmit = async (e) => { 
        e.preventDefault()
        const token = localStorage.getItem("token")
        let response; 
        try { 
            if (editDepartment) {
            const id = editDepartment._id 
            response = await updateDepartmentApi(id, department, token)
            console.log(response)
        } else {
            response = await addDepartmentApi(department, token)
        }
        if (response.data.success) {
            refreshDepartment()
            closeModal()
        }
        setDepartment({
                dep_name: "", 
                description: ""
        })
        setEditDepartment(null)
        } catch(e) {
            console.log(e)
        }
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
        <div className='bg-white w-[500px] rounded-lg p-6 relative'>
            <button className='absolute top-2 right-3 flex items-center justify-center w-8 h-8 text-xl font-bold rounded-full hover:bg-red-500 hover:text-white transition' onClick={closeModal}>
                <IoClose />
            </button>
            <h3 className='text-2xl font-bold mb-5'>{editDepartment ? "Edit Department": "Add Departmenet"}</h3>
        <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
                <label className='mb-1' htmlFor='dep_name'>Department Name</label><br />
                <input 
                value={department.dep_name} 
                onChange={handleChange} 
                name="dep_name"
                className='w-full border px-3 py-2 rounded' type='text' placeholder='Enter department name' required />
            </div>
            <div>
                <label className='mb-2' htmlFor='description'>Description</label><br />
                <textarea 
                value={department.description} 
                onChange={handleChange} 
                rows="4" 
                name="description"
                className='w-full border px-3 py-2 rounded' name='description' placeholder='Enter description'></textarea>
            </div>
            <button type='submit' className='bg-teal-500 text-white p-2 rounded'>{editDepartment ? "Update Department" : "Add Department"}</button>
        </form>
        </div>
    </div>
  )
}

export default AddDepartment
