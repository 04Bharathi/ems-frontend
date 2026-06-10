import axios from 'axios'

const API = axios.create({
    baseURL: "https://ems-api-alpha.vercel.app/api/auth"
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
    console.log(response)
    return response.data
}