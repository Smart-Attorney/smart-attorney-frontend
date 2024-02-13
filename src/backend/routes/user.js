const express = require('express')
const User = require('../model/userModel')

const router = express.Router()

// GET all users
router.get('/', (req,res) => {
    res.json({mssg: 'GET all users'})
})

// GET a single user
router.get('/:id', (req,res) => {
    res.json({mssg: 'GET a single user'})
})

// POST a new user, AKA registration
router.post('/', async (req, res) => {
    const { Username, Password } = req.body;
    
    try {
        // Check if the username already exists in the database
        const existingUser = await User.findOne({ Username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const user = await User.create({ Username, Password });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a new case folder
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a case folder'})
}) 

// UPDATE a new case folder
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new case folder'})
}) 

module.exports = router