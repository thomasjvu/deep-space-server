const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')
const User = require('../models/userModel')

// ROUTE    /notes/
// PRIV?    Public Access
// DESC.    @GET (Read) All (Public) Notes 
const getAllNotes = asyncHandler(async (req, res) => {

    const notes = await Note.find()

    res.status(200).json(notes)
})

// ROUTE    /notes/
// PRIV?    Public Access
// DESC.    @GET (Read) All (Public) Notes 
const getSingleUserNotes = asyncHandler(async (req, res) => {
    res.json({ message: `Read Single User's Note ${req.params.id}`})
})

// ROUTE    /notes/
// PRIV?    Public Access
// DESC.    @GET (Read) All (Public) Notes 
const getCurrentUserNotes = asyncHandler(async (req, res) => {

    const notes = await Note.find({ user: req.user.id })

    res.status(200).json(notes)
})

// ROUTE    /notes/:id
// PRIV?    Public Access
// DESC.    @GET (Read) Single Note
const getSingleNote = asyncHandler(async (req, res) => {
    res.json({ message: `Read Single Note ${req.params.id}`})
})

// ROUTE    /notes/
// PRIV?    Private Access
// DESC.    @POST (Create) All Notes
const postSingleNote = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const note = await Note.create({
        text: req.body.text,
        privacy: req.body.privacy,
        user: req.user.id
    })

    res.status(200).json(note)
})

// ROUTE    /notes/:id
// PRIV?    Private Access
// DESC.    @PUT (Update) Single Note 
const putSingleNote = asyncHandler(async (req, res) => {

    const note = await Note.findById(req.params.id)

    if (!note) {
        res.status(400)
        throw new Error('Note not found!')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found!')
    }

    // Make sure the logged-in user matches the note's user
    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized!')
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedNote)
})

// ROUTE    /notes/:id
// PRIV?    Private Access
// DESC.    @DELETE (Delete) Single Note 
const deleteSingleNote = asyncHandler(async (req, res) => {

    const note = await Note.findById(req.params.id)

    if (!note) {
        res.status(400)
        throw new Error('Note not found!')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found!')
    }

    // Make sure the logged-in user matches the note's user
    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized!')
    }

    await note.deleteOne()    

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getAllNotes, getSingleUserNotes, getCurrentUserNotes, postSingleNote, getSingleNote, putSingleNote, deleteSingleNote
}
