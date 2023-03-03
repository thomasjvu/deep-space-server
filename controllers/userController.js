const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// ROUTE    /users/
// PRIV?    Public Access
// DESC.    @GET (Read) All Users
const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find()

    res.status(200).json(users)
})

// ROUTE    /users/
// PRIV?    Public Access
// DESC.    @POST (Create) Login User
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    // Check for User Email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    res.json({message: 'Login User'})
})

// ROUTE    /users/
// PRIV?    Public Access
// DESC.    @POST (Create) Register User
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    // Throw bad request error if some field isn't filled
    if( !username || !email || !password ) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Throw bad request error if user already exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }

    res.json({ message: 'Register User' })
})

// ROUTE    /users/me
// PRIV?    Private Access
// DESC.    @GET (Read) Current User
const getCurrentUser = asyncHandler(async (req, res) => {

    // const {_id, name, email} = await User.findById(req.user.id)
    
    res.status(200).json(req.user)
})

// Generate JWT (Token)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    loginUser,
    registerUser,
    getCurrentUser,
    getAllUsers,
}
