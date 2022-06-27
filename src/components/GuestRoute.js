import React from 'react'
import { Navigate } from 'react-router-dom'

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null

  if (token) {
    return <Navigate to="/" />
  }

  return children
}

export default GuestRoute
