const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const listRouter = require('./routes/listRoutes.js');
const noteRouter = require('./routes/noteRoutes.js');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ Could not connect to MongoDB:', err);
    process.exit(1); // Optional: stop the app if DB connection fails
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lists', listRouter);
app.use('/api/notes', noteRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
