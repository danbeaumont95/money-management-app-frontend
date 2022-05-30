import React from 'react';
import './App.css';
import Main from './Component/Main';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import PlaidLink from './Component/PlaidLink';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/plaidLink" element={<PlaidLink />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
