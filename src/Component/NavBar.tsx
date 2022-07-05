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

          <a href="/linkedAccounts" className="nav-item">Linked accounts</a>
          <button className="signOutButton" type="button">Sign out</button>
        </ul>
      </div>
    );
  }
}
