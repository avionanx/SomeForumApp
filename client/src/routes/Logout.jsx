import React from 'react'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
    const navigate = useNavigate()
    const logout = async () => {
        const res = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        })
        const data = await res.json()
        navigate('/')
    }
  React.useEffect(() => {
    logout()
  }, [])
}

export default Logout
