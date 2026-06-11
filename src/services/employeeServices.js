import axios from "axios";

import {getDepartment} from './addDepartmentService'

export const getDepartmentList = async () => {
    let departments;
    const token = localStorage.getItem("token")
    try {
      const response = await getDepartment(token)
      if (response.data.success) {
        departments = response.data.departmentList
      }
    } catch(e) {
        console.log(e)
    }
    return departments
}

const API = axios.create({
  baseURL: "https://ems-api-red.vercel.app/api/employee"
})

export const addEmployee = async (data, token) => {
    const response = await API.post("/add", 
        data, {
            headers: {
                Authorization: `Bearer ${token}`, 
                "Content-Type": "multipart/form-data"
            }
        }
    )

    return response
}

export const getEmployeeList = async (token) => {
    try {
        const response = await API.get("/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log("Employee API Response:", response.data)
        return response
    } catch (error) {
        console.error("Employee API Error:", error.response?.data || error.message)
        throw error
    }
}

export const getEmployeeById = async (id, token) => {
    const response = API.get(`/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response
}

export const updateEmployeeApi = async (id, data, token) => {
    const response = await API.put(`/${id}`,
        data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const getEmployeeByDep = async (id, token) => {
    const response = await API.get(`/department/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}