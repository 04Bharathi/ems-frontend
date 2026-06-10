import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import AddDepartment from './AddDepartment'
import { deleteDepartmentApi, getDepartment } from '../../services/addDepartmentService'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelpers'


const DepartmentList = () => {
  const [showModal, setShowModal] = useState(false);
  const [department, setDepartment] = useState([]);
  const [editDepartment, setEditDepartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchDepartment, setSearchDepartment] = useState([]);
  const [seacrh, setSearch] = useState("")

  const getDepartmentList = async () => {
    const token = localStorage.getItem("token")
    setLoading(true)
    try {
      const response = await getDepartment(token)
      if (response.data.success) {
        let sno = 1
        const data = await response.data.departmentList.map((dep) => (
         {
           _id: dep._id, 
           dep_name: dep.dep_name,
           sno: sno++,
           action: (<DepartmentButtons 
            department={dep} 
            setEditDepartment={setEditDepartment} 
            setShowModal={setShowModal} 
            handleDelete={handleDelete}
          />)
         }
        ))
          setDepartment(data)
          setSearchDepartment(data)
      }
    } catch(e) {
      console.log(e.response)
    } finally {
       setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token")
    try {
      const confirmDelete = window.confirm("Please confirm")
      if (confirmDelete) {
        const response = await deleteDepartmentApi(id, token)
        if (response.data.success) {
          getDepartmentList()
        }
      }
      
    } catch(e) {
      
    }
  }

  useEffect(() => {
    getDepartmentList()
  }, [])

  const handleSearch = (e) => {
    const filteredList = department.filter((eachDep) => eachDep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearchDepartment(filteredList)
  }

  return (
    <div>
      {loading ? <p>Loading</p> : (
      <div className='p-4'>   
        <div>
          <h3 className='text-center font-sans font-bold text-xl'>Manage Departments</h3>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <input onChange={(e) => handleSearch(e)} className='w-1/2 p-1 rounded border border-black' type='text' placeholder='Search by department' />
          <button className='bg-teal-500 text-white p-1 rounded' onClick={() => setShowModal(true)}>Add New Department</button>
        </div>
        {showModal && (<AddDepartment refreshDepartment={getDepartmentList} setEditDepartment={setEditDepartment} editDepartment={editDepartment} closeModal={() => setShowModal(false)} />)}
        {searchDepartment ? (
          <div className='mt-5 rounded'>
            <DataTable columns={columns} data={searchDepartment} pagination />
          </div>
        ): (
          <p>Loading...</p>
        ) }
          
      </div>
      )}
    </div>
    
  )
}

export default DepartmentList