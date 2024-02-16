const express = require('express');
const multer = require('multer');
const File = require('../model/fileModel')

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

// Upload a file
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Create a new file document
        const newFile = new File({
            filename: req.file.filename,
            size: req.file.size,
            contentType: req.file.mimetype
        });
        // Save the file document to the database
        const savedFile = await newFile.save();

        res.status(200).json(savedFile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all files
router.get('/', async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific file by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
