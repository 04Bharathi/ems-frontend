import axios from "axios";

const API = axios.create({
    baseURL: "https://ems-api-green.vercel.app/api/department"
})

export const addDepartmentApi = async (data, token) => {
    const response = await API.post("/add",
        data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } )
    return response
}

export const getDepartment = async (token) => {
    const response = await API.get("/",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        } )
    return response
}

export const updateDepartmentApi = async (id, data, token) => {
    const response = await API.put(`/${id}`,
        data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const deleteDepartmentApi = async (id, token) => {
    const response = await API.delete(`/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}