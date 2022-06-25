import React, { useContext } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { NoteContext } from '../context/NoteContext'

const Note = (props) => {
  const { loadingNote, deleteNote } = useContext(NoteContext)

  if (loadingNote) {
    return <h1>Loading SaM...</h1>
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.note?.title}</h5>
        <p className="card-text">{props.note?.description}</p>
        <div className="btn-container d-flex justify-content-end align-items-center">
          <Link
            className="btn btn-dark"
            style={{ color: 'white' }}
            to={`/update/${props.note?._id}`}
          >
            <FaEdit />
          </Link>
          <button
            className="btn btn-danger mx-2"
            onClick={() => {
              deleteNote(props.note?._id)
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Note
