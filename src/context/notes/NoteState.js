import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000";
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // get all notes
    const getNotes = async () => {   

        // API CALL
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
                    });
            const json = await response.json();
            console.log(json);
            setNotes(json);
    }

    
    // Add a note
    const addNote = async(title, description, tag) => {

        // API CALL
        const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        

        // Logic to add note on client-side
        const note =
        {

            "title": title,
            "description": description,
            "tag": tag

        }
        console.log(notes.concat(note));
        setNotes(notes.concat(note));

    }

    // Delete a note
    const deleteNote = async(id) => {

        // API CALL
        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
            
        });
        const json = response.json();

        // Logic to delete on client-side
        console.log("Deleting note -", id)
        setNotes(notes.filter((note) => { return note._id !== id }));

    }

    // Edit a note 
    const editNote = async (id, title, description, tag) => {

        // API CALL
        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag})
        });
      

        // Logic to edit on client-side
        const newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;

                break;
            }
        }
        setNotes(newNotes);

    }




    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>

            {props.children}

        </noteContext.Provider>
    )

}
export default NoteState;