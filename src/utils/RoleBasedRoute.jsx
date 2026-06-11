import React, { use } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const RoleBasedRoute = ({ children, validRoles }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!validRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default RoleBasedRoute