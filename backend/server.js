const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/book');
const socketHandlers = require('./socket/handlers');
const cors = require("cors");
const errorHandler = require('./middleware/errorHandlerMiddleware');


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(express.json());

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socketHandlers(io, socket);
});

// Make io accessible to routes
app.set('io', io);

app.get('/', (req, res) => {
  res.send('API is running...');
});   

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use(errorHandler.notFound);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});