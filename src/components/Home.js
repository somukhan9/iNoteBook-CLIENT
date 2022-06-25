import React from 'react'
import { Link } from 'react-router-dom'
import Notes from './Notes'

const Home = () => {
  return (
    <div className="container">
      <Link to="/create" className="btn btn-dark my-3">
        Add Note
      </Link>
      <Notes />
    </div>
  )
}

export default Home
