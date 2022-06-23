import React from 'react';
import '../Styles/NavBar.css';

export default function NavBar() {
  return (
    <div className="navbar">
      <h3 className="title">Dans money</h3>
      <ul className="nav-links">

        <a href="/linkedAccounts" className="nav-item">Linked accounts</a>
        <button className="signOutButton" type="button">Sign out</button>
      </ul>
    </div>
  );
}
