import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';



const Note = (props) => {

    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "",etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const refClose = useRef(null);

    const updatenote = (currrentNote) => {
        ref.current.click();
        setNote({ id: currrentNote._id,etitle: currrentNote.title, edescription: currrentNote.description, etag: currrentNote.tag });
        props.showAlert("Note added successfully", "success");
    }




    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });

    }

    const handleClick = (e) => {
        // e.preventDefault(); since not insie form
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated note successfully", "success");
    }

    useEffect(() => {
        if(localStorage.getItem('token'))
        getNotes();

        else
        navigate('/login');
    }, []);

    return (
        <>
            <Addnote key={note._id} showAlert={props.showAlert}/>

            {/* MODAL */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="container my-3" >
                                <div className="mb-2">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} minLength={5} required/>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle < 5 || note.edescription < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h2 >Your Notes</h2>
                <div className="container mx-2">
                    {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updatenote={updatenote} showAlert={props.showAlert} />;
                })}
            </div>
        </>
    )
}

export default Note
