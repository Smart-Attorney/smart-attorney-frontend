const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fileSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    folder: {
        type: Schema.Types.ObjectId,
        ref: 'Folder'
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {timestamps: true});

module.exports = fileSchema