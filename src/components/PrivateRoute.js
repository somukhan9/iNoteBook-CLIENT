import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null

  if (!token) {
    return <Navigate to="/login" />
  }
  return children
}

export default PrivateRoute
