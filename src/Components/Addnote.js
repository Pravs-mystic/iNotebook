import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';


const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag); 
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note added successfully", "success");
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });

    }

    return (
        <div>
            <h2>Add a Note</h2>
            <form className="container my-3" >
                <div className="mb-2">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value = {note.title} minLength ={5} required />
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handleChange} value={note.description} minLength={5} required/>
                </div>
                <div className="mb-2">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange}  value = {note.tag}/>
                </div>
            
                <button disabled = {note.title<5 || note.description <5} type="submit" className="btn btn-primary mt-2" onClick={handleClick}>Add Note</button>
            </form>

        </div>
    )
}

export default Addnote
