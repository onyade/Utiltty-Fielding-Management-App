const WebSocket = require('ws');

// Define a function to generate simulated data for a vehicle or personnel
function generateData(type) {
  const id = Math.floor(Math.random() * 1000);
  const name = `#${id}`;
  const latitude = 37.7749 + (Math.random() - 0.5) * 0.2;
  const longitude = -122.4194 + (Math.random() - 0.5) * 0.2;
  const location = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  const
