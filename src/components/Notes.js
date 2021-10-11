import React, { useContext, useEffect, useRef, useState} from "react";
import { useHistory } from "react-router-dom";
import AddNote from "./AddNote";
import NotesContext from "../Context/notes/notescontext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(NotesContext);
  const { notes, getNote,editNote } = context;

  const [Note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"});
  const history=useHistory();
    
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
    }
    else{
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose=useRef(null);

  const update = (note) => {
    ref.current.click();
    setNote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag});
    console.log(note);
  };

  //on Changing the input of the title and description
  const onChange=(e)=>{
    setNote({...Note,[e.target.name]:e.target.value});
}

//onClicking the submit button it updates the note
const handleClick=()=>{
    editNote(Note.id,Note.etitle,Note.edescription,Note.etag);
    ref.current.click();
  }

  return (
    <>
      <AddNote />
      <h4>Your Notes</h4>

      {/* if notes are null it shows empty message */}
      <div className="container mx-3">
        {notes.length === 0 && "no notes to display"}
      </div>

      {/* Modal for the editing the note */}
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="container md-3 my-3">
                  <div className="col-auto">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={Note.etitle}
                      onChange={onChange}
                      placeholder="title"
                    />
                  </div>
                  <div className="col-auto  my-2">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="edescription"
                      id="edescription"
                      placeholder="description"
                      value={Note.edescription}
                      onChange={onChange}
                    />
                  </div>
                  <div className="col-auto  my-2">
                    <label htmlFor="tag">tag</label>
                    <input
                      type="text"
                      className="form-control"
                      name="etag"
                      id="etag"
                      value={Note.etag}
                      placeholder="tag"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                done
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row md-3">
        {notes.map((note) => {
          return <NoteItem key={note._id} update={update} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
