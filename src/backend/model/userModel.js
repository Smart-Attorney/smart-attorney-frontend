const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    Username: {
        type: String,
        reqired: true
    },
    Password: {
        type: String,
        required: true
    },
    folders: [caseFolderSchema] 
})

module.exports = mongoose.model('User', userSchema)