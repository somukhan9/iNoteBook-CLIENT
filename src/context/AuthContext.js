import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : ''

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(false)

  const fetchUserData = async () => {
    setLoadingUser(true)
    try {
      const response = await fetch('/auth/get-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await response.json()

      if (response.status === 200) {
        setUser(json.user)
        // navigate('/')
      } else if (response.status === 400) {
        console.log(json.msg)
      } else if (response.status === 401) {
        console.log(json.msg)
      } else if (json.status === 500) {
        console.log(json.msg)
      }
    } catch (error) {
      alert(error.message)
    }
    setLoadingUser(false)
  }

  const loginUser = async (body) => {
    setLoadingUser(true)
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const json = await response.json()
      if (response.status === 200) {
        localStorage.setItem('token', json.token)
        navigate('/')
      } else if (response.status === 400) {
        alert(json.msg)
      } else if (response.status === 500) {
        alert(json.msg)
      }
    } catch (error) {
      alert(error.message)
    }
    setLoadingUser(false)
  }

  const registerUser = async (body) => {
    setLoadingUser(true)
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const json = await response.json()
      if (response.status === 201) {
        localStorage.setItem('token', json.token)
        navigate('/')
      } else if (response.status === 400) {
        alert(json.msg)
      } else if (response.status === 500) {
        alert(json.msg)
      }
    } catch (error) {
      console.error(alert(error.message))
    }
    setLoadingUser(false)
  }

  const logoutUser = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      navigate('/login')
    } else {
      alert('You are already logged out.')
    }
  }

  const values = {
    token,
    user,
    loginUser,
    registerUser,
    logoutUser,
  }

  useEffect(() => {
    fetchUserData()
    // eslint-disable-next-line
  }, [token])

  if (loadingUser) {
    return <h1 className="text-center my-5">Loading...</h1>
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
