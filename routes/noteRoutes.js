const express = require('express')
const router = express.Router()
const { getSingleNote, getSingleUserNotes, getCurrentUserNotes, getAllNotes, postSingleNote, deleteSingleNote, putSingleNote} = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')

// ROUTE    /notes/
// DESC.    @GET (Read) All Notes
router.get('/', getAllNotes)

// ROUTE    /notes/user
// DESC.    @GET (Read) Current User's Notes
router.get('/user', protect, getCurrentUserNotes)

// ROUTE    /notes/:username/:id
// DESC.    @GET (Read) Any User's Notes
router.get('/:username/:id', protect, getSingleUserNotes)

// ROUTE    /notes/
// DESC.    @POST (Create) All Note 
router.post('/', protect, postSingleNote)

// ROUTE    /notes/:id
// DESC.    @GET (Read) Single Note 
router.get('/:id', protect, getSingleNote)

// ROUTE    /notes/:id
// DESC.    @PUT (Update) Single Note
router.put('/:id', protect, putSingleNote)

// ROUTE    /notes/:id
// DESC.    @DELETE (Delete) Single Note 
router.delete('/:id', protect, deleteSingleNote)

module.exports = router
