const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const authRoutes = require('./routes/auth');
dotenv.config();

connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth',authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});