import React, { useContext } from 'react'
import NoteContext from '../Context/notes/notescontext';
import AlertContext from '../Context/alert/alertcontext';

const NoteItem = (props) => {
    const context=useContext(NoteContext);
    const {deleteNote}=context;
    const {note,update}=props;
    const {title,description,tag}=note;

    const contextalert=useContext(AlertContext);
    const {showAlert}=contextalert;

    //calling the deleteNote from the context and pasing the id of a note
    const handleDelete=()=>{
        deleteNote(note._id);
        showAlert("Deleted the note","success");
    }
    const handleUpdate=()=>{
        update(note);
    }
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{tag}</p>
                    <button className="btn-sm btn-danger mx-2" onClick={handleDelete} >Delete</button>
                    <button className="btn-sm btn-primary mx-2" onClick={handleUpdate}>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
