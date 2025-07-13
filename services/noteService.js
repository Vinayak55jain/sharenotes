const List = require('../models/list');

exports.createNote = async ({ pincode, content, listId }) => {
    try {
        const listItem = await List.findOne({ _id: listId, pincode: pincode });
        if (!listItem) {
            throw new Error('List not found or invalid pincode');
        }

        const newNote = { content };

        listItem.notes.push(newNote);
        listItem.updatedAt = new Date(); // Corrected typo from updateAt to updatedAt
        await listItem.save();

        return newNote;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
};

exports.getNotesByListId = async ({ listId, pincode }) => {
    try {
        const listItem = await List.findOne({ _id: listId, pincode: pincode });
        if (!listItem) {
            return null;
        }
        return listItem.notes;
    } catch (error) {
        console.error('Error getting notes by list ID:', error);
        throw error;
    }
};
