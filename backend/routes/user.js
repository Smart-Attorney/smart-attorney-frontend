const express = require('express');
const { getAllUsers, getSingleUser, updateUserInfo, deleteUserByID, registration, login } = require('../controllers/userController');

const router = express.Router();

// GET all users
router.get('/', getAllUsers);

// GET a single user
router.get('/:id', getSingleUser);

// POST a new user, AKA registration
router.post('/registration', registration);

// POST a user, login
router.post('/login', login)

// DELETE a user by ID
router.delete('/:id', deleteUserByID);

// UPDATE a user by ID
router.patch('/:id', updateUserInfo);

module.exports = router;
