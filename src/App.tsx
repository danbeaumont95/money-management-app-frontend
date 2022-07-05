import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Main from './Component/Main';
import PlaidLink from './Component/PlaidLink';
import LinkedAccounts from './Component/LinkedAccounts';
import LinkedAccount from './Component/LinkedAccount';
import Home from './Component/Home';
import Profile from './Component/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Home />} />
          <Route path="/plaidLink" element={<PlaidLink />} />
          <Route path="/linkedAccounts" element={<LinkedAccounts />} />
          <Route path="/linkedAccounts/:account_id" element={<LinkedAccount />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
