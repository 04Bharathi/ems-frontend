import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:5000/api/auth"
})

export const loginUser = async (data) => {
    const response = await API.post("/login", data);
    return response.data;
};

export const verifyUsers = async (token) => {
    const response = await API.get("/verify", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    return response.data
}