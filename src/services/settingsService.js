import axios from "axios";

const API = axios.create({
    baseURL: "https://ems-api-green.vercel.app/api"
})

export const changePassword = async (data) => {
    const response = await API.put("/settings", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response
}