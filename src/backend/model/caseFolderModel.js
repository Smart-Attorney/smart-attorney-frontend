const mongoose = require('mongoose')
const fileSchema = require('../Schema/fileSchema')
const Schema = mongoose.Schema

const caseFolderSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    usersWithAccess: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Language: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    Notes: {
        type: String,
        required: false
    },
    files: [fileSchema]
}, {timestamps: true})

module.exports = mongoose.model('caseFolder', caseFolderSchema)
