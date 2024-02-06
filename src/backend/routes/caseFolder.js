const express = require('express')
const multer = require('multer');
const CaseFolder = require('../model/caseFolderModel')

const router = express.Router()

// GET all case folders
router.get('/', (req,res) => {
    res.json({mssg: 'GET all case folders'})
})

// GET a single case folder
router.get('/:id', (req,res) => {
    res.json({mssg: 'GET a single case folder'})
})

// POST a new case folder
router.post('/', upload.array('files'), async (req, res) => {
    // Extract data from the request body
    const userId = req.user._id;
    const {Title, FirstName, LastName, Language, DOB, Notes } = req.body;
    try {
        const files = req.files.map(file => ({
            filename: file.filename,
            size: file.size
        }));
        const caseFolder = await CaseFolder.create({
            Title,
            FirstName,
            LastName,
            Language,
            DOB,
            Notes,
            owner: userId, // Set the owner of the folder
            files
        });
        res.status(200).json(caseFolder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a new case folder
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a case folder'})
}) 

// UPDATE a new case folder
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new case folder'})
}) 

module.exports = router