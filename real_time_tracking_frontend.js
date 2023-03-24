// create a React-based frontend to display the real-time tracking data.
// use the WebSocket API to communicate with the server.

import React, { useState, useEffect } from 'react';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [personnel, setPersonnel] = useState([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = new WebSocket('ws://localhost:8080');

    // Handle WebSocket messages
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'vehicle') {
        setVehicles((vehicles) => [...vehicles, data]);
      } else if (data.type === 'personnel') {
        setPersonnel((personnel) => [...personnel, data]);
      }
    };

    // Cleanup function to disconnect from the WebSocket server
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Real-time Tracking</h1>
      <h2>Vehicles</h2>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>{vehicle.name} - {vehicle.location}</li>
        ))}
      </ul>
      <h2>Personnel</h2>
      <ul>
        {personnel.map((person) => (
          <li key={person.id}>{person.name} - {person.location}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
