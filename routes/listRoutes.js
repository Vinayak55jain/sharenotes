const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const listController = require('../controllers/listController');

// ✅ Use authMiddleware for protected routes
router.post('/', authMiddleware, listController.createList);
router.get('/', authMiddleware, listController.getAllLists);
router.get('/:id', authMiddleware, listController.getListById);

module.exports = router;
