import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NoteContext = createContext()

const NoteProvider = ({ children }) => {
  const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null

  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [loadingNote, setLoadingNote] = useState(false)

  const fetchAllNotes = async () => {
    setLoadingNote(true)
    try {
      const response = await fetch('/notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await response.json()

      if (response.status === 200) {
        setNotes(json.notes)
      } else if (response.status === 400) {
        alert(json.msg)
      } else if (response.status === 500) {
        alert(json.msg)
      }
    } catch (error) {
      alert(error.message)
    }
    setLoadingNote(false)
  }

  const getSingleNote = async (id) => {
    setLoadingNote(true)
    try {
      const response = await fetch(`/notes/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await response.json()

      if (response.status === 200) {
        // notes.concat(json.note)
      } else if (response.status === 400) {
        alert(json.msg)
      } else if (response.status === 500) {
        alert(json.msg)
      }
    } catch (error) {
      alert(error.message)
    }
    setLoadingNote(false)
  }

  const createNote = async (body) => {
    setLoadingNote(true)
    try {
      const response = await fetch('/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      const json = await response.json()

      if (response.status === 201) {
        setNotes([...notes, json.note])
        navigate('/')
      } else if (response.status === 400) {
        alert(json.msg)
      } else if (response.status === 500) {
        alert(json.msg)
      }
    } catch (error) {
      alert(error)
    }
    setLoadingNote(false)
  }

  const updateNote = async (id, body) => {
    setLoadingNote(true)
    try {
      const response = await fetch(`/notes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      const json = await response.json()

      if (response.status === 200) {
        notes.forEach((element) => {
          if (element._id === id) {
            element.title = json.note.title
            element.description = json.note.description
          }
        })
        navigate('/')
      } else if (response.status === 400) {
        alert(json.msg)
      } else if (response.status === 500) {
        alert(json.msg)
      }
    } catch (error) {
      alert(error.message)
    }
    setLoadingNote(false)
  }

  const deleteNote = async (id) => {
    setLoadingNote(true)
    try {
      const response = await fetch(`/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await response.json()

      if (response.status === 200) {
        setNotes(notes.filter((note) => note._id !== id))
        navigate('/')
      } else if (response.status === 400) {
        alert(json.msg)
      } else if (response.status === 500) {
        alert(json.msg)
      }
    } catch (error) {
      alert(error.message)
    }
    setLoadingNote(false)
  }

  useEffect(() => {
    fetchAllNotes()
    // eslint-disable-next-line
  }, [token])

  const values = {
    notes,
    loadingNote,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote,
  }

  return <NoteContext.Provider value={values}>{children}</NoteContext.Provider>
}

export { NoteContext, NoteProvider }
