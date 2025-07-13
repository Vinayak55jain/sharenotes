const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    grade:{
        type: String,
        required: true
    },
    Rollno:{
        type: Number,
        required: true
    }

});
module.exports = mongoose.model('Class', classSchema);