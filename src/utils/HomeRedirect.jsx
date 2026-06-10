import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const HomeRedirect = () => {
    const {user, loading} = useAuth()

    if (loading) {
        return <p>Loading...</p>
    } 

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (user.role === "admin") {
        return <Navigate to="/admin-dashboard" replace />
    }

    return <Navigate to="/employee-dashboard" replace />
    
}

export default HomeRedirect
