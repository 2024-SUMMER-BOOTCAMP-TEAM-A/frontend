import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div style={{ width: '100%', height: '100vh', margin: 0 }}>
      <h1>Welcome to the App</h1>
      <Link to="/main">Go to StarField</Link>
    </div>
  );
}
export default App;

