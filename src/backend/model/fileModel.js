const mongoose = require('mongoose');
const fileSchema = require('../Schema/fileSchema');

const File = mongoose.model('File', fileSchema);

module.exports = File;
