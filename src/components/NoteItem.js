import React, { useContext } from 'react'
import NoteContext from '../Context/notes/notescontext';

const NoteItem = (props) => {
    const context=useContext(NoteContext);
    const {deleteNote}=context;
    const {note,update}=props;
    const {title,description,tag}=note;

    //calling the deleteNote from the context and pasing the id of a note
    const handleDelete=()=>{
        deleteNote(note._id);
    }

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{tag}</p>
                    <button className="btn-sm btn-danger mx-2" onClick={handleDelete} >Delete</button>
                    <button className="btn-sm btn-primary mx-2" onClick={()=>{update(note)}}>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
