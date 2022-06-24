import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';

function App() {
  const [token, setToken] = useState<string | null>(null);
 
  if (!token) {
    return (
      <Login setToken={setToken} />
    );
  }

  return (
    <div>
      <h1 className="p-2 text-4xl font-semibold">Application</h1>

      <Router>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}  />
          <Route path='/preferences' element={<Preferences />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
