import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const token = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null

  const { logoutUser } = useContext(AuthContext)
  const location = useLocation()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  location.pathname === '/' ? 'nav-link active' : 'nav-link'
                }
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {token ? (
              <li className="nav-item">
                <button
                  className={
                    location.pathname === '/logout'
                      ? 'nav-link btn active'
                      : 'nav-link btn'
                  }
                  to="/logout"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={
                      location.pathname === '/login'
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      location.pathname === '/register'
                        ? 'nav-link active'
                        : 'nav-link'
                    }
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
