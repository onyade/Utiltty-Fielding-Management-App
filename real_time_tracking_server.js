const express = require('express');
const WebSocket = require('ws');

const app = express();

// Serve the React frontend
app.use(express.static('frontend/build'));

// Define a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Store the connected clients
const clients = new Set();

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  // Handle WebSocket messages
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle WebSocket disconnections
  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
