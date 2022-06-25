import React from 'react'
import { Navigate } from 'react-router-dom'

const GuestRoute = ({ user, children }) => {
  const token = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null

  if (token) {
    return <Navigate to="/" />
  }

  return children
}

export default GuestRoute
