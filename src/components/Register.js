import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
  const { registerUser } = useContext(AuthContext)
  const [user, setUser] = useState({ name: '', email: '', password: '' })

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser(user)
  }

  return (
    <div className="container w-50 my-5">
      <h1 className="text-center my-4">Register Here</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={handleOnChange}
            value={user.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="form-control"
            onChange={handleOnChange}
            value={user.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="emapasswordil"
            className="form-control"
            onChange={handleOnChange}
            value={user.password}
          />
        </div>
        <button className="btn btn-primary my-2" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
