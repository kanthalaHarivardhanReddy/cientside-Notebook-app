import React, { useContext,useState } from "react";
import NotesContext from '../Context/notes/notescontext';

const AddNote = () => {
    const context=useContext(NotesContext);
    const {addNote}=context;

    const [Note, setNote] = useState({title:"",description:"",tag:"default"});

    //on Changing the input of the title and description
    const onChange=(e)=>{
      setNote({...Note,[e.target.name]:e.target.value});
    }

    //onClicking the submit button it create a new note
    const handleClick=(e)=>{
      e.preventDefault();
      console.log("Adding note"+Note.title);
      addNote(Note.title,Note.description,Note.tag);
      setNote({title:"",description:"",tag:""});
    }


  return (
    <>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form className="row g-3">
          <div className="container md-3 my-3">
            <div className="col-auto">
              <label htmlFor="title" >
                Title
              </label>
              <input type="text" 
              className="form-control"
               id="title"
               name="title"
               value={Note.title}
               onChange={onChange}
               placeholder="title"
                />
            </div>
            <div className="col-auto  my-2">
              <label htmlFor="description">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                name="description"
                id="description"
                placeholder="description"
                value={Note.description}
               onChange={onChange}
              />
            </div>
            <div className="col-auto  my-2">
              <label htmlFor="tag">
                tag
              </label>
              <input
                type="text"
                className="form-control"
                name="tag"
                id="tag"
                value={Note.tag}
                placeholder="tag"
               onChange={onChange}
              />
            </div>
            <div className="col-auto">
              <button type="submit" 
              className="btn btn-success mb-3 my-2"
              onClick={handleClick}
              >Add Note
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNote;