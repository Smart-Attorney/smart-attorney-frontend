const express = require('express');
const User = require('../model/userModel');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

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
    const { companyEmail, password, firstName, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ companyEmail });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt round

        // Create a new user with the hashed password
        // const user = await User.create({ companyEmail, password: hashedPassword, firstName, lastName });
        const user = await User.create({ companyEmail, password, firstName, lastName });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in registration:', error);

        let errorMessage = 'Registration failed. Please try again.';

        // Check if it's a MongoDB validation error
        if (error.name === 'ValidationError') {
            errorMessage = 'Validation error. Please check your input.';
        }
        res.status(400).json({ error: errorMessage });
    }
};

// POST a user (login)
const login = async (req, res) => {
    const {companyEmail, password} = req.body
    let passwordMatch = false

    try {
        // Check if user exists
        const user = await User.findOne({ companyEmail });

        if (!user) {
            return res.status(401).json({ error: 'no user' });
        }

        // Compare passwords
        // const passwordMatch = await bcrypt.compare(password, user.password);
        if (password == user.password) {
            passwordMatch = true
        }
        if (!passwordMatch) {
            console.log('inputted Email', companyEmail)
            console.log('inputted password:', password);
            console.log('Stored hashed password:', user.password);
            return res.status(401).json({ error: 'Password no match' });
        }

        // Passwords match, authentication successful
        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
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
    const { companyEmail, password, firstName, lastName } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { companyEmail, password, firstName, lastName }, { new: true });
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
    registration,
    login
}