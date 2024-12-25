const socketHandlers = (io, socket) => {
    // Handle joining different rooms (e.g., by user role)
    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  };
  
  module.exports = socketHandlers;