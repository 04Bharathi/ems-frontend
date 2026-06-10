import React, { createContext, useContext, useEffect, useState } from 'react'
import { verifyUsers } from '../services/authService'

const userContext = createContext()

const AuthContext = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const verifyUser = async () => {
      const token = localStorage.getItem("token")
      try {
        if (token) {
          const response = await verifyUsers(token)
          setUser(response.user)
          setLoading(false)
        }
      } catch(e) {
        console.log(e)
        setUser(null)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    verifyUser()
  },[])

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

  return (
    <userContext.Provider value={{login, user, logout, loading}}>
        {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext)

export default AuthContext
