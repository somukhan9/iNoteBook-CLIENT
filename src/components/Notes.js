import React, { useContext } from 'react'
import { NoteContext } from '../context/NoteContext'
import Note from './Note'

const Notes = () => {
  const { notes, loadingNote } = useContext(NoteContext)

  return (
    <div className="row">
      <p className="my-2">
        Total Notes :<strong> {notes.length}</strong>
      </p>
      {loadingNote ? (
        <h1 className="text-center my-2">Loading...</h1>
      ) : (
        <>
          {notes?.map((note, i) => {
            return (
              <div className="col-md-3 my-2" key={note?._id}>
                <Note note={note} />
              </div>
            )
          })}
          {notes?.length === 0 && (
            <h1 className="text-center my-4">No Notes Found.</h1>
          )}
        </>
      )}
    </div>
  )
}

export default Notes
