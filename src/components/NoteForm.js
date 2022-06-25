import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NoteContext } from '../context/NoteContext'

const NoteForm = (props) => {
  const token = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null

  const params = useParams()
  const { loadingNote, createNote, updateNote } = useContext(NoteContext)
  const [note, setNote] = useState({ title: '', description: '' })

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    if (props.updating) {
      updateNote(params.id, note)
    } else {
      createNote(note)
    }
  }

  const checkIfUpdating = async () => {
    if (props.updating) {
      try {
        const response = await fetch(`/notes/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        const json = await response.json()
        if (response.status === 200) {
          setNote(json.note)
        } else if (response.status === 400) {
          alert(json.msg)
        } else if (response.status === 500) {
          alert(json.msg)
        }
      } catch (error) {
        alert(error.message)
      }
    }
  }

  useEffect(() => {
    checkIfUpdating()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container w-50 mx-auto my-4">
      <h1>{props.updating ? 'Update Note' : 'Add Note'}</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            onChange={handleOnChange}
            value={note.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Description</label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            onChange={handleOnChange}
            value={note.description}
          ></textarea>
        </div>
        <button
          className="btn btn-primary my-2"
          onClick={handleSubmitForm}
          disabled={loadingNote}
        >
          {props.updating ? 'Update Note' : 'Create Note'}
        </button>
      </form>
    </div>
  )
}

export default NoteForm
