// filepath: /Users/ansaralisarkar/Desktop/my-project/my-notes/backend/src/controllers/noteController.js
const Note = require('../models/note');

// Get all notes with pagination
const getAllNotes = async (req, res) => {
    try {
        // Get pagination parameters from query string
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const offset = (page - 1) * limit;

        // Get total count of notes
        const totalItems = await Note.count();
        const totalPages = Math.ceil(totalItems / limit);

        // Fetch paginated notes
        const notes = await Note.findAll({
            order: [['updatedAt', 'DESC']],
            limit,
            offset,
        });

        // Return paginated response
        res.status(200).json({
            notes,
            pagination: {
                totalItems,
                totalPages,
                currentPage: page,
                itemsPerPage: limit,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single note by ID
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, description, format } = req.body;
        const note = await Note.create({
            title,
            description,
            format: format || 'card',
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const { title, description, format } = req.body;
        const [updated] = await Note.update({ title, description, format }, { where: { id: req.params.id } });

        if (updated) {
            const updatedNote = await Note.findByPk(req.params.id);
            res.status(200).json(updatedNote);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const deleted = await Note.destroy({
            where: { id: req.params.id },
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
};
