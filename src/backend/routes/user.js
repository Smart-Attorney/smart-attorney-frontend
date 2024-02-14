const express = require('express');
const { getAllUsers, getSingleUser, updateUserInfo, deleteUserByID, registration } = require('../controllers/userController');

const router = express.Router();

// GET all users
router.get('/', getAllUsers);

// GET a single user
router.get('/:id', getSingleUser);

// POST a new user, AKA registration
router.post('/registration', registration);

// DELETE a user by ID
router.delete('/:id', deleteUserByID);

// UPDATE a user by ID
router.patch('/:id', updateUserInfo);

module.exports = router;
