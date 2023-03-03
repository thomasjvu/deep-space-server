const express = require("express")
const router = express.Router()
const { getAllUsers, loginUser, registerUser, getCurrentUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware.js')

// ROUTE    /users/
// DESC.    @GET (Read) All Users
router.get('/', getAllUsers)

// ROUTE    /users/me (eventually, make this /profile or /account)
// DESC.    @GET (Read) Current User
router.get('/me', protect, getCurrentUser)

// ROUTE    /users/:id
// DESC.    @GET (Read) Single User
// router.get('/:id', getSingleUser)

// ROUTE    /users/login
// DESC.    @POST (Create) Single Users
router.post('/login', loginUser)

// ROUTE    /users/register
// DESC.    @POST (Create) Single Users
router.post('/register', registerUser)

// ROUTE    /users/:id
// DESC.    @GET (Read) Single Users

// ROUTE    /users/:id
// DESC.    @GET (Read) Single Users

module.exports = router
