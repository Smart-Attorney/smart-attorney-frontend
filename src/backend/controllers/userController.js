
const express = require('express');
const User = require('../model/userModel');

const router = express.Router();

// GET all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({createdAt: -1});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET a single user by ID
const getSingleUser = async (req,res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// POST a new user (registration)
const registration = async (req, res) => {
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
};

// DELETE a user by ID

const deleteUserByID = async (req,res) => {
    const { id } = req.params

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// UPDATE a user by ID

const updateUserInfo = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }
    const { Username, Password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { Username, Password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    deleteUserByID,
    updateUserInfo,
    getAllUsers,
    getSingleUser,
    registration
}