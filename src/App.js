import { Routes, Route } from 'react-router-dom'
import GuestRoute from './components/GuestRoute'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import NoteForm from './components/NoteForm'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/Register'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <NoteForm updating={false} />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <NoteForm updating={true} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
