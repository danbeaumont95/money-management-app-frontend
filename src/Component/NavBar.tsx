import React, { Component } from 'react';
import UserService from '../services/user';
import '../Styles/NavBar.css';

type Props = {}

type State = {
  firstName: string;
}

export default class NavBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: '',
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    const accessToken: any = localStorage.getItem('accessToken');

    UserService.getMyDetails(accessToken)
      .then((res) => {
        if (res.data.firstName) {
          this.setState({ firstName: res.data.firstName });
        } else {
          this.setState({ firstName: 'Dan' });
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSignOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    // eslint-disable-next-line no-return-assign
    return window.location.href = '/';
  }

  render() {
    const { firstName } = this.state;
    return (
      <div className="navbar">
        <h3 className="title">
          {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
          &#39;s
          {' '}
          money
        </h3>
        <ul className="nav-links">
          <a href="/plaidLink" className="nav-item">Linked new account</a>
          <a href="/linkedAccounts" className="nav-item">Linked accounts</a>
          <button className="signOutButton" type="button" onClick={this.handleSignOut}>Sign out</button>
        </ul>
      </div>
    );
  }
}
