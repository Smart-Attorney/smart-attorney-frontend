const CaseFolder = require('../model/caseFolderModel')
const mongoose = require('mongoose')

// GET all caseFolders
const getCaseFolders = async (req,res) => {
    const caseFolders = await CaseFolder.find({}).sort({createdAt: -1})
    res.status(200).json(caseFolders)
}

// GET a single caseFolder
const getCaseFolder = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such caseFolder'})
    }
    const caseFolder = await CaseFolder.findById(id)

    if(!caseFolder) {
        return res.status(404).json({error: 'No such caseFolder'})
    }

    return res.status(200).json(caseFolder)
}

// CREATE a new caseFolder
const createCaseFolder = async (req, res) => {
    const { Title, Owner, FirstName, LastName, Language, DOB, Notes } = req.body;
    // const { Title, FirstName, LastName, Language, DOB, Notes } = req.body;
    try {
        const existingCaseFolder = await CaseFolder.findOne({ Title });
        if (existingCaseFolder) {
            return res.status(400).json({ error: 'A case folder with the same title already exists.' });
        }
        let files = [];
        if (req.files && Array.isArray(req.files)) {
            files = req.files.map(file => ({
                filename: file.filename,
                size: file.size
            }));
        }
        const caseFolder = await CaseFolder.create({
            Title,
            Owner,
            FirstName,
            LastName,
            Language,
            DOB,
            Notes,
            files
        });
        res.status(200).json(caseFolder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// UPDATE a caseFolder
const updateCaseFolder = async (req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such caseFolder'})
    }
    const caseFolder = await CaseFolder.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!caseFolder) {
        return res.status(400).json({error: "no such Case Folder"})
    }
    return res.status(200).json(caseFolder)
}
// DELETE a caseFolder
const deleteCaseFolder = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Case Folder'})
    }
    const caseFolder = await CaseFolder.findOneAndDelete({_id: id})
    if(!caseFolder) {
        return res.status(400).json({error: "no such Case Folder"})
    }
    return res.status(200).json(caseFolder)
}

module.exports = {
    getCaseFolder,
    getCaseFolders,
    createCaseFolder,
    deleteCaseFolder,
    updateCaseFolder
}