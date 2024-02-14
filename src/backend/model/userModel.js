const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        reqired: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        reqired: true
    },
    lastName: {
        type: String,
        required: true
    },
    folders: [caseFolderSchema] 
})

module.exports = mongoose.model('User', userSchema)