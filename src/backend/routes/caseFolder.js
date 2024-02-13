const express = require('express')
const multer = require('multer');
const {
    getCaseFolder,
    getCaseFolders,
    createCaseFolder
} = require('../controllers/caseFolderController')
const CaseFolder = require('../model/caseFolderModel')

const router = express.Router()

// Define multer storage and file upload settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where files will be stored
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Set the file name
        cb(null, file.originalname)
    }
});

// Initialize multer upload instance
const upload = multer({ storage: storage });

// GET all case folders
router.get('/', getCaseFolders)

// GET a single case folder
router.get('/:id', getCaseFolder)

// POST a new case folder
router.post('/', upload.array('files'), createCaseFolder)

// DELETE a new case folder
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a case folder'})
}) 

// UPDATE a new case folder
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new case folder'})
}) 

module.exports = router