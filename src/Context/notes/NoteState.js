import React,{useState} from 'react'
import NotesContext from './notescontext';

const NoteState = (props) => {
    const InitialNotes=[]
    const [notes, setNotes] = useState(InitialNotes);
    const host="http://localhost:5000";
    
    //Function for getting all the note from the server
    const getNote=async ()=>{
      //API Call
      const response=await fetch(`${host}/notes/getnotes`,{
        method:'GET',
        headers:{
          "content-type":"application/json",
          "auth-token":localStorage.getItem('token')
        }
      });

      //getting all notes from the server(db) and adding to notes state
      const json=await response.json();
      setNotes(json);
    }


    //Function for adding a note in to notes state
    const addNote=async (title,description,tag)=>{
      //API Call
      const response=await fetch(`${host}/notes/addnote`,{
        method:'POST',
        headers:{
          "content-type":"application/json",
          "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });

      const note=await response.json();

      //Logic to add a  note
      setNotes(notes.concat(note));
    }

    //Function for Deleting  a note from the notes state
    const deleteNote= async (id)=>{
      //API call
      const response=await fetch(`${host}/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          "content-type":"application/json",
          "auth-token":localStorage.getItem('token')
        }
      });
      const json=await response.json();
      console.log(json);

      //logic to delete notes
      const newNote=notes.filter((note)=>{return note._id!==id});
      setNotes(newNote);
    }

    //Function for Editing/Updating a note from the notes state
    const editNote=async (id,title,description,tag)=>{
      //APIcall
      const response=await fetch(`${host}/notes/updatenote/${id}`,{
        method:'PUT',
        headers:{
          "content-type":"application/json",
          "auth-token":localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      });
      const json= await response.json();
      console.log(json);

      //Logic to edit notes
      let newNotes=JSON.parse(JSON.stringify(notes));

      for(let index=0;index<newNotes.length;index++){
        if(newNotes[index]._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
      }

      setNotes(newNotes);
    }


    return (
        <NotesContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState
