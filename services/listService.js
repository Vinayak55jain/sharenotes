const mongoose = require('mongoose');
const List = require('../models/list');
const generatePin = require('../utils/generatePin');

exports.createList = async ({ title, userId }) => {
  try {
    const pincode = generatePin();

    const newList = new List({
      title,
      owner: userId,
      pincode,
      notes: []
    });

    await newList.save();
    return newList;
  } catch (error) {
    console.error('❌ Error creating list:', error);
    throw error;
  }
};

exports.getAllLists = async (userId) => {
  try {
    const lists = await List.find({ owner: userId });
    return lists;
  } catch (error) {
    console.error('❌ Error fetching all lists:', error);
    throw error;
  }
};

exports.getListById = async (listId, userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(listId)) {
      return null; // to trigger 404 from controller
    }

    const list = await List.findOne({ _id: listId, owner: userId });
    return list;
  } catch (error) {
    console.error('❌ Error fetching list by ID:', error);
    throw error;
  }
};
