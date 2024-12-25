const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/book');
dotenv.config();

connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/books',booksRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});