import React, { Component } from 'react';
import '../Styles/NavBar.css'
export default class NavBar extends Component {
  render() {
    return (
      <div className='navbar'>
      <h3 className='title'>Dans money</h3>
      <ul className='nav-links'>

      <a href="/linkedAccounts" className='nav-item'>Linked accounts</a>
        <button className='signOutButton'>Sign out</button>
      </ul>
    </div>
    )
  }
}
