const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteContorller');

router.post('/:listId', noteController.createNote);
router.get('/:listId', noteController.getNotesByListId); // we'll implement this too

module.exports = router;
