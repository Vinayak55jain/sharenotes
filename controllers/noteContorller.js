const noteService = require('../services/noteService');

exports.createNote = async (req, res) => {
    try {
        const { pincode, content } = req.body;
        const listId = req.params.listId;

        if (!pincode || !content) {
            return res.status(400).json({ message: 'Pincode and content are required' });
        }

        const noteCreated = await noteService.createNote({ pincode, content, listId });

        if (!noteCreated) {
            return res.status(500).json({ message: 'Failed to create note' });
        }

        return res.json({ message: 'Note created successfully', note: noteCreated });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getNotesByListId = async (req, res) => {
    try {
        const listId = req.params.listId;
        const pincode = req.query.pincode;

        if (!pincode) {
            return res.status(400).json({ message: 'Pincode is required' });
        }

        const notes = await noteService.getNotesByListId({ listId, pincode });

        if (!notes) {
            return res.status(404).json({ message: 'List not found or pincode is incorrect' });
        }

        return res.json({ notes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
