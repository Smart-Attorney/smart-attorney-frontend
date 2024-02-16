const mongoose = require('mongoose');
const caseFolderSchema = require('../Schema/caseFolderSchema');

const CaseFolder = mongoose.model('CaseFolder', caseFolderSchema);

module.exports = CaseFolder;
