const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Notes using Get: api/auth/fetchallnotes. login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {


        const userId = req.user.id;
        const notes = await Notes.find({ userId })
        res.json(notes);
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Internal Server Error");
    }
})

// ROUTE 2: Add Notes using POST: api/auth/addnote. login required
router.put('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // Returning bad errrors
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        const userId = req.user.id;
        const note = Notes({
            user: userId,
            title: title,
            description: description,
            tag: tag,
        });
        const savedNote = await note.save();
        res.json({ savedNote });
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Internal Server Error");
    }
})

// ROUTE 3: Update Notes using PUT: api/auth/updatenote. login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };

        //Find the note to be updated and update it

        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("not found");
        }

        // Allow updation only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.json(note);

    } catch (err) {
        console.error(err.message)
        res.status(500).json("Internal Server Error");
    }
}
)

// ROUTE 4: Delete Notes using DELETE: api/auth/deletenote. login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {

        //Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");
        }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (err) {
        console.error(err.message)
        res.status(500).json("Internal Server Error");
    }

})

module.exports = router;