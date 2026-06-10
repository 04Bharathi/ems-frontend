import React, { useState } from 'react'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "", 
        password: ""
    });
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const {login} = useAuth();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData)
            console.log(response)

            if(response.success) {
                console.log(response)
                const userData = JSON.stringify(response.user)
                login(response.user)
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", userData)
                if (response.user.role === "admin") {
                    navigate("/admin-dashboard")
                } else {
                    navigate("/employee-dashboard")
                }
            }
        } catch(e) {
            setError(e.response.data.message)
            console.log(e.response.data.message)
        }
        
    };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 to-gray-100 to-50% space-y-6'>
        <h2 className='font-sevillana text-3xl text-white'>Employee Management Dashboard</h2>
        <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-2'>Login</h2>
        {error && (<p className='text-red-500'>{error}</p>)}
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700'>Email</label>
                <input type='email' value={formData.email} name='email' onChange={handleChange} required className='w-full px-3 py-2 border' placeholder='Enter Email' />
            </div>
            <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-700'>Email</label>
                <input value={formData.password} type='password' name='password' onChange={handleChange} required className='w-full px-3 py-2 border' placeholder='****' />
            </div>
            <div className='mb-4 flex items-center justify-between'>
                <label className='flex items-center'>
                    <div>
                    <input type='checkbox' className='form-checkbox mt-2' />
                    </div>
                    <span className='ml-2 text-gray-700'>Remember me</span>
                </label>
                <a href='#' className='text-teal-500'>Forget Password</a>
            </div>
            <div className='mb-4'>
                <button type='submit' className='w-full bg-teal-400 text-white py-2'>Login</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
