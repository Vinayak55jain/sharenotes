const listService = require('../services/listService');

exports.createList = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const list = await listService.createList({
      title,
      userId: req.user._id
    });

    if (!list) {
      return res.status(500).json({ message: 'Failed to create list' });
    }

    return res.status(201).json({
      message: 'List created successfully',
      list,
      pincode: list.pincode
    });
  } catch (error) {
    console.error('❌ Error in createList:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllLists = async (req, res) => {
  try {
    const lists = await listService.getAllLists(req.user._id);

    if (!lists || lists.length === 0) {
      return res.status(404).json({ message: 'No lists found' });
    }

    return res.status(200).json(lists);
  } catch (error) {
    console.error('❌ Error in getAllLists:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getListById = async (req, res) => {
  try {
    const listId = req.params.id;

    const list = await listService.getListById(listId, req.user._id);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    return res.status(200).json(list);
  } catch (error) {
    console.error('❌ Error in getListById:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
