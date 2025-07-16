const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
let arr=[];
mongoose.connect('mongodb+srv://vinayakjainlife:suddendeath123%40@cluster0.efw6gnu.mongodb.net/ctf', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))   
    .catch(err => console.error('MongoDB connection error:', err));
    const Class = require('./class');
    
app.post('/class',async (req, res) => {
    try {
        const classData = new Class(req.body);
        await classData.save();
        res.status(201).send(classData);
    } catch (error) {
        res.status(400).send(error);
    }
});


app.listen(5000,()=>{
    console.log("Server is running on port 5000");});
