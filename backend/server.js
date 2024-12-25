const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
dotenv.config();

connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});