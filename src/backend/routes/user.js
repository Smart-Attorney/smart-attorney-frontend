const express = require('express');
const { getAllUsers, getSingleUser, updateUserInfo, deleteUserByID, registration } = require('../controllers/userController');

const router = express.Router();

// GET all users
router.get('/', getAllUsers);

// GET a single user
router.get('/user/:id', getSingleUser);

// POST a new user, AKA registration
router.post('/user/registration', registration);

// DELETE a user by ID
router.delete('/user/:id', deleteUserByID);

// UPDATE a user by ID
router.patch('/user/:id', updateUserInfo);

module.exports = router;
