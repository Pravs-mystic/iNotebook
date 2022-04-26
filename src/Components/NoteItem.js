import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
    const { note, updatenote, showAlert} = props;
    const context = useContext(noteContext);
    const { deleteNote} = context;

    const handleDelete = (id)=>{
        deleteNote(id);
        showAlert("Deleted note successfully", "success");
    }

  
    return (
        <div className="col-md-3" >

            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title"> {note.title}</h5>
                    <p className="card-text">  {note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{handleDelete(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updatenote(note) }}></i>
                </div>
            </div>

        </div>
    )
}

export default NoteItem
